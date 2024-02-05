const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("./models/Students.model");
const Cohort = require("./models/Cohorts.model");

const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohorts = require("./cohorts.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((db) => console.log(`Connected to database: "${db.connection.name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const indexRoutes = require("./routes/index.routes.js");
app.use("/api", indexRoutes);

const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling.js");

app.use(errorHandler);
app.use(notFoundHandler);

//ajouter les catch err

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
