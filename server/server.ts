const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = require("../src/app/models");
db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`\n\n * * * Server is listening on port ${PORT}. * * * \n\n`);
});



/* //to drop existing tables and re sync
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/