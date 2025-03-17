const { notes, users } = require("../database");

//Create a new note
const createNote = async (req, res) => {
	const { title, content } = req.body;
	if (!title || !content) {
		return res.status(400).json({ message: "Title and content are required" });
	}
	const newNote = {
		id: notes.length + 1,
		title,
		content,
		owner: req.user.id,
		sharedWith: [],
	};
	notes.push(newNote);
	res.status(201).json(newNote);
};

// Update a note
const updateNote = (req, res) => {
	const note = notes.find((note) => note.id === parseInt(req.params.id));

	if (!note) {
		return res.status(404).json({ message: "Note not found" });
	}

	// Only owner or admin can update the note
	if (note.owner !== req.user.id && req.user.role !== "admin") {
		return res.status(403).json({ message: "You are not authorized to update this note" });
	}

	const { title, content } = req.body;
	if (title) note.title = title;
	if (content) note.content = content;

	res.json({ message: "Note updated successfully", note });
};

//Fetch all notes
const getNotes = async (req, res) => {
	if (req.user.role === "admin") {
		console.log("allnotes", notes);
		return res.json(notes);
	}
	//get user specific or shared notes
	const userNotes = notes.filter((note) => note.owner === req.user.id || note.sharedWith.includes(req.user.email));
	res.json(userNotes);
};

//Fetch a single note
const getNoteById = (req, res) => {
	const note = notes.find((note) => note.id === parseInt(req.params.id));
	if (!note) {
		return res.status(404).json({ message: "Not found" });
	}
	if (note.owner !== req.user.id && !note.sharedWith.includes(req.user.email) && req.user.role !== "admin") {
		return res.status(403).json({ message: "Access denied" });
	}
	res.json(note);
};

//Delete a note
const deleteNote = (req, res) => {
	const noteIndex = notes.findIndex((note) => note.id === parseInt(req.params.id));
	if (noteIndex === -1) {
		return res.status(404).json({ message: "Note not found" });
	}
	const note = notes[noteIndex];
	if (note.owner !== req.user.id && req.user.role !== "admin") {
		return res.status(403), json({ message: "You are not authorized to perfom this action" });
	}
	//delete the note
	notes.splice(noteIndex, 1);
	res.json({ message: "Note deleted successfully" });
};

//Share a note
const shareNote = (req, res) => {
	const note = notes.find((note) => note.id === parseInt(req.params.id));
	if (!note) {
		return res.status(404).json({ message: "Not found" });
	}
	if (note.owner !== req.user.id) {
		return res.status(403).json({ message: "Only owner can share this note" });
	}
	const { email } = req.body;
	console.log("email", email);
	const userToShareWith = users.find((user) => user.email === email);
	if (!userToShareWith) {
		return res.status(404).json({ message: "User not found" });
	}
	//share the note
	console.log("note", note);
	if (!note.sharedWith.includes(email)) {
		note.sharedWith.push(email);
	}
	res.json({ message: `Note has been shared with ${email}` });
};

module.exports = { createNote, getNotes, updateNote, getNoteById, deleteNote, shareNote };
