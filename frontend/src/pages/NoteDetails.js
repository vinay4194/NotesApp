import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteById, updateNote, shareNote } from "../services/api";

const NoteDetails = () => {
	const { id } = useParams();
	const [note, setNote] = useState(null);
	const [editedNote, setEditedNote] = useState({ title: "", content: "" });
	const [shareEmail, setShareEmail] = useState("");

	useEffect(() => {
		fetchNote();
	}, []);

	const fetchNote = async () => {
		const data = await getNoteById(id);
		setNote(data);
		setEditedNote({ title: data.title, content: data.content });
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		await updateNote(id, editedNote);
		fetchNote();
	};

	const handleShare = async (e) => {
		e.preventDefault();
		await shareNote(id, shareEmail);
		alert("Note shared successfully!");
	};

	if (!note) return <p>Loading...</p>;

	return (
		<div>
			<h2>Notes</h2>
			<form onSubmit={handleUpdate}>
				<input type="text" value={editedNote.title} onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })} required />
				<textarea value={editedNote.content} onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })} required />
				<button type="submit">Update</button>
			</form>

			<h3>Share Note</h3>
			<form onSubmit={handleShare}>
				<input type="email" placeholder="User's email" value={shareEmail} onChange={(e) => setShareEmail(e.target.value)} required />
				<button type="submit">Share</button>
			</form>
		</div>
	);
};

export default NoteDetails;
