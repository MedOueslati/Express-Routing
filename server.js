// Import the required modules
const express = require("express");
const app = express();
const port = 3000;

// Middleware to verify if it's within working hours
const verifyTime = (req, res, next) => {
  let today = new Date();
  let day = today.getDay();
  let hours = today.getHours();

  console.log(day);
  console.log(hours);

  // Check if it's a weekday (Monday to Friday) and time is between 9 AM and 4 PM
  if (day >= 1 && day <= 7 && hours >= 9 && hours <= 17) {
    next(); // Continue to the next middleware or route
  } else {
    // If outside working hours, send a message
    res.send(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              text-align: center;
              padding: 50px;
            }
            h1 {
              color: #ff5733;
            }
          </style>
        </head>
        <body>
          <h1>Sorry, it's currently outside of working hours!</h1>
          <p>Our working hours are Monday to Friday, from 9 AM to 5 PM.</p>
        </body>
      </html>
    `);
  }
};

// Apply the verifyTime middleware to all routes
// app.use(verifyTime);

// Serve static files from the "images" folder
app.use("/images", express.static(__dirname + "/images"));

// Define routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/home.html");
});
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/pages/contact.html");
});
app.get("/ourservices", (req, res) => {
  res.sendFile(__dirname + "/pages/ourservices.html");
});

// Serve CSS file
app.get("/styles.css", (req, res) => {
  res.sendFile(__dirname + "/pages/styles.css");
});

// Handle 404 - Not Found
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/pages/404.html");
});

// Start the server on port 3000
// i modify this code to interact my Express app on my mobile device. 
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});