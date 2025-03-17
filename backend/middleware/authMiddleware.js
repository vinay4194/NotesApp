const jwt = require("jsonwebtoken");
const { users } = require("../database");

//check for a valid token
const protect = (req, res, next) => {
	let token = req.headers.authorization;
	if (!token || !token.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Not authorized" });
	}

	try {
		token = token.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET || "my_secret_key");
		req.user = users.find((user) => user.id === decoded.id);
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};

const isAdmin = (req, res, next) => {
	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Not authorized" });
	}
	next();
};

module.exports = { protect, isAdmin };
