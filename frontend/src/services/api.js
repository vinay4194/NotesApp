import axios from "axios";
const BASE_URL = "http://localhost:8000/api";

//Get all notes
export const getNotes = async () => {
	const res = await axios.get(`${BASE_URL}/notes`, {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	});
	return res.data;
};

//Create a new note
export const createNote = async (noteData) => {
	const res = await axios.post(`${BASE_URL}/notes`, noteData, {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	});
	return res.data;
};

//Fetch single note
export const getNoteById = async (id) => {
	const res = await axios.get(`${BASE_URL}/notes/${id}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	});
	return res.data;
};

// Edit a note
export const updateNote = async (id, updatedData) => {
	const res = await axios.put(`${BASE_URL}/notes/${id}`, updatedData, {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	});
	return res.data;
};

//Delete a note
export const deleteNote = async (id) => {
	const res = await axios.delete(`${BASE_URL}/notes/${id}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	});
	return res.data;
};

//Share a note
export const shareNote = async (id, email) => {
	const res = await axios.post(
		`${BASE_URL}/notes/${id}/share`,
		{ email },
		{
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		}
	);
	return res.data;
};
