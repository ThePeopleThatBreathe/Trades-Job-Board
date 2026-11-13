// Import the express module
import express from "express";
import dotenv from "dotenv"
dotenv.config();

// Create an instance of an express application
const app = express();

// Define a port number for our server to listen on
const PORT = 3004;

// Create an array for created jobs
const jobs = [];

// Enable static file serving
app.use(express.static("public"));

// set view engine to ejs
app.set("view engine", "ejs");

// Add "middleware" to allow the app to parse form data
// Access form data through req.body
app.use(express.urlencoded({ extended: true }));

// Define a default route ("/")
app.get("/", (req, res) => {
  res.render("home", { jobs });
});

// Define a route to add a job ("/")
app.get("/add-job", (req, res) => {
  res.render("add-job");
});

// Define a route to submit form data and show confirmation page
app.post("/submit-job", (req, res) => {
  const job = req.body;

  job["timestamp"] = new Date();
  console.log(job);
  jobs.push(job);
  console.log(jobs)

  res.render("confirm", {job});
});

// Start the server on the designated port
app.listen(PORT, () => {
  console.log(`Server is running at 
        http://localhost:${PORT}`);
});
