const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../database");

//generate jwt
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET || "my_secret_key", { expiresIn: "1h" });
};

//Register users
const register = async (req, res) => {
	const { name, email, password } = req.body;
	//check if user already exists
	if (users.find((user) => user.email === email)) {
		return res.status(400).json({ message: "User already exists" });
	}
	//register user and send jwt as response
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = { id: users.length + 1, name, email, password: hashedPassword, role: "user" };
	users.push(newUser);
	res.status(201).json({ token: generateToken(newUser.id), user: newUser });
};

//Login user
const login = async (req, res) => {
	const { email, password } = req.body;
	const user = users.find((user) => user.email === email);
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(401).json({ message: "Invalid credentials" });
	}
	res.json({ token: generateToken(user.id), user });
};

module.exports = { register, login };
