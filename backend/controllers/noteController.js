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

//Fetch all notes
const getNotes = async (req, res) => {
	if (req.users.role === "admin") {
		return res.json(notes);
	}
	//get user specific or shared notes
	const userNotes = notes.filter((note) => note.owner === req.user.id || note.sharedWith.includes(req.user.id));
	res.json(userNotes);
};

//Fetch a single note
const getNoteById = (req, res) => {
	const note = notes.find((note) => note.id === parseInt(req.params.id));
	if (!note) {
		return res.status(404).json({ message: "Not found" });
	}
	if (note.owner !== req.user.id && !note.sharedWith.includes(req.user.id) && req.user.role !== "admin") {
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
	const { userId } = req.body;
	const userToShareWith = users.find((user) => user.id === userId);
	if (!userToShareWith) {
		return res.status(404).json({ message: "User not found" });
	}
	//share the note
	if (!note.sharedWith.includes(userId)) {
		notes.sharedWith.push(userId);
	}
	res.json({ message: `Note has been shared with ${userToShareWith.email}` });
};

module.exports = { createNote, getNotes, getNoteById, deleteNote, shareNote };
