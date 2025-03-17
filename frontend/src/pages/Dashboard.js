import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { getNotes, createNote, deleteNote } from "../services/api";

const Dashboard = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const [notes, setNotes] = useState([]);
	const [newNote, setNewnote] = useState({ title: "", content: "" });

	useEffect(() => {
		fetchNotes();
	}, []);

	const fetchNotes = async () => {
		const data = await getNotes();
		setNotes(data);
	};
	const handleCreateNote = async (e) => {
		e.preventDefault();
		await createNote(newNote);
		// setNotes({ title: "", content: "" });
		fetchNotes();
	};
	const handleDelete = async (id) => {
		await deleteNote(id);
		fetchNotes();
	};
	const handleViewNote = (id) => {
		navigate(`/notes/${id}`);
	};

	return (
		<div>
			<h2>Dashboard</h2>

			<form onSubmit={handleCreateNote}>
				<input
					type="text"
					placeholder="Title"
					value={newNote.title}
					onChange={(e) => setNewnote({ ...newNote, title: e.target.value })}
					required
				/>
				<textarea
					placeholder="Content (supports markdown)"
					value={newNote.content}
					onChange={(e) => setNewnote({ ...newNote, content: e.target.value })}
					required
				/>
				<button type="submit">Create Note</button>
			</form>

			<h3>Your Notes</h3>
			<ul>
				{notes?.map((note) => (
					<li key={note.id}>
						<strong>{note.title}</strong>
						<p>{note.content}</p>
						<button onClick={() => handleViewNote(note.id)}>View</button>
						<button onClick={() => handleDelete(note.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Dashboard;
