// Import the express module
import express from "express";
import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();

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
  res.render("home", { jobs  });
});

// Define a route to add a job ("/")
app.get("/add-job", (req, res) => {
  res.render("add-job");
});

// Define a route to submit form data and show confirmation page
app.post("/submit-job", async (req, res) => {
  const job = req.body;
  console.log(job);

  job.internship = req.body.internship == "true" ? true : false;
  
  
  try {
    const sql = `INSERT INTO job_listings 
    (job_title, company_name, trade_area, location, internship, working_hours, 
    post_date, expiration_date, application_url, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  //create an array of parameters from order data
  const params = [
      job["job-title"],
      job["company-name"],
      job["trade-area"],
      job["location"],
      job["internship"],
      job["working-hours"],
      job["post-date"],
      job["expiration-date"],
      job["application-url"],
      job["description"],
  ];

  // Execute query
  const [result] = await pool.execute(sql, params);
  jobs.push(job);
  res.render("confirm", {job});  
} catch (err) {
  console.log("Inserting into db has caused an error: ", err);
  res.status(500).send("Sorry. An error has occured. Please try again or try later");
}

  

  
});

// Start the server on the designated port
app.listen(PORT, () => {
  console.log(`Server is running at 
        http://localhost:${PORT}`);
});
