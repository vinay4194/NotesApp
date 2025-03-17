import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
	const [formData, setFormData] = useState({ name: "", email: "", password: "" });
	const navigate = useNavigate();
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:8000/api/auth/register", formData);
			navigate("/");
		} catch (error) {
			console.log(error);
			alert(error.response.data.message);
		}
	};
	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" name="name" placeholder="name" onChange={handleChange} required />
				<input type="email" name="email" placeholder="email" onChange={handleChange} required />
				<input type="password" name="password" placeholder="password" onChange={handleChange} required />
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
