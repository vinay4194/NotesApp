import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setUser(JSON.parse(localStorage.getItem("user")));
		}
	}, []);

	const login = (userData, token) => {
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
		navigate("/dashboard");
	};
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
		navigate("/");
	};
	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
