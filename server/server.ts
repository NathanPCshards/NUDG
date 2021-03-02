const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");



var mainRoutes = require('./routes.ts')

const app = express();
/*
app.use(mainRoutes);
const db = require("./app/models");
db.sequelize.sync();
*/
var corsOptions = {
  origin: "http://localhost:3000"
};




/*
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/*", (req, res) => {
  res.json({ message: "Welcome to the backend application." });
});

app.listen(PORT, () => {
  console.log(`\n\n * * * Server is listening on port ${PORT}. * * * \n\n`);
});*/



// set port, listen for requests
const PORT = process.env.PORT || 3000;


var http = require('http').createServer(app)
var io = require('socket.io')(http);

io.on('connection', (socket)=>{
  console.log('user has connected successfully')
});

/*
http.listen(3000, () => {
  console.log('listening at port 3000');
});

*/


var mysql = require('mysql')
// Let’s make node/socketio listen on port 3000
var io = require('socket.io').listen(3000)
// Define our db creds
var db = mysql.createConnection({
    host: '192.168.0.2',
    PORT:"3306",
    user: 'root',
    password: 'password',
    database: 'test'
})
 
// Log any errors connected to the db
db.connect(function(err){
    if (err) console.log(err)
})
 
// Define/initialize our global vars
var orgweaknesses = []
var isInitNotes = false
var socketCount = 0
 
io.sockets.on('connection', function(socket){
    // Socket has connected, increase socket count
    socketCount++
    // Let all sockets know how many are connected
    io.sockets.emit('users connected', socketCount)
 
    socket.on('disconnect', function() {
        // Decrease the socket count on a disconnect, emit
        socketCount--
        io.sockets.emit('users connected', socketCount)
    })
 
    socket.on('new note', function(data){
        // New note added, push to all sockets and insert into db
        orgweaknesses.push(data)
        io.sockets.emit('new note', data)
        // Use node's db injection format to filter incoming data
        db.query('INSERT INTO orgweaknesses (note) VALUES (?)', data.note)
    })
 
    // Check to see if initial query/notes are set
    if (! isInitNotes) {
        // Initial app start, run db query
        db.query('SELECT * FROM notes')
            .on('result', function(data){
                // Push results onto the notes array
                orgweaknesses.push(data)
            })
            .on('end', function(){
                // Only emit notes after query has been completed
                socket.emit('initial notes', orgweaknesses)
            })
 
        isInitNotes = true
    } else {
        // Initial notes already exist, send out
        socket.emit('initial notes', orgweaknesses)
    }
})





 