const express = require("express");
const cors = require("cors");
// const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";
const app = express();
const PORT = process.env.PORT || 8000;

//initilizing middlewares
app.use(express.json());
app.use(cors());
// app.use(helmet());
app.use(morgan("dev"));

//healthcheck
app.get("/", (req, res) => {
	res.send("Node server is running!!");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

app.listen(PORT, () => console.log(`server running of ${PORT}`));
