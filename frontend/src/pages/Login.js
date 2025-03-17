import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const { login } = useContext(AuthContext);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:8000/api/auth/login", formData);
			login(res.data.user, res.data.token);
		} catch (error) {
			console.log(error);
			alert(error.response.data.message);
		}
	};
	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input type="email" name="email" placeholder="email" onChange={handleChange} required />
				<input type="password" name="password" placeholder="password" onChange={handleChange} required />
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
