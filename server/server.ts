
const bodyParser = require("body-parser");


var express = require('express');

var http = require('http');

var io = require('socket.io')(http, {cors: {}});
var app = express();
var server = app.listen(3000, () =>{
  console.log("servers up")
});





server.on('connection', socket => {
  console.log("no shot this works");

  server.emit('ToClient' , "MessageSent");

  socket.on('test' , function(data){
    console.log("test");
  })



  })

/*
let testSocket = io('http://localhost');
testSocket.emit("test" , "data would go here");
*/

 
// Define/initialize our global vars
var orgweaknesses = []
var isInitNotes = false




/*
io.sockets.on('connection', function(socket){
    console.log("user connected")
   
 
    socket.on('disconnect', function() {
        // Decrease the socket count on a disconnect, emit
      
        console.log('users connected')
    })
  
})*/














var mysql = require('mysql')

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

