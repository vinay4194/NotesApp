import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);

	return (
		<nav>
			<h2>Note App</h2>
			{user && <Link to="/dashboard">Dashboard</Link>}
			{user ? (
				<button onClick={logout}>Logout</button>
			) : (
				<>
					<Link to="/">Login</Link> <br />
					<Link to="/register">Register</Link>
				</>
			)}
		</nav>
	);
};

export default Navbar;
