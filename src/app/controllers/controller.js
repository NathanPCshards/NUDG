const db = require("../models");
const actorTable = db.actorTable;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    console.log("'create' function called in controller.js")
    db.actorTable.create({
        actor_id: req.body.actor_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        last_update: req.body.last_update

    })
  
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    console.log("'findAll' function called in controller.js")

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    console.log("'findOne' function called in controller.js")

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    console.log("'update' function called in controller.js")

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    console.log("'delete' function called in controller.js")

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    console.log("'deleteall' function called in controller.js")

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    console.log("'findAllPublished' function called in controller.js")

};
