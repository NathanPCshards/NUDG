//import * as express from 'express';
import { routes } from "./routes";


//Connecting to the database -----------------------------------------------------
const cors = require('cors'); //cross-origin requests
const bodyParser = require('body-parser'); 
const mysql = require('mysql')
const events = require('events');
const express = require('express');

const connection = mysql.createConnection({
    host     : 'nudg.database.windows.net',
    user     : 'pcshardsadmin',
    password : 'Pcshards&7', 
    database : 'NudgDatabase',
  });

  
 // let temp = connection.connect();

 // console.log("attempting to connect to port " +port);


connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



const app = express()
.use(cors())
.use(bodyParser.json())
.use(events(connection));



app.use((req,res,next) =>{
  res.header('Access-Control-Allow-Origin' , '*')
  res.header('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods' , 'OPTIONS, GET, POST, PUT, DELETE')
  if('OPTIONS' == req.method){
      res.sendStatus(200);
  }else {
      console.log('${req.ip} ${req.method} ${req.url}');
      next();
  }
})

//defualt port localhost:4200

const port = process.env.PORT || 4200;
app.use(express.json());
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });



  //-------------------------------------------------------------------------------

//LoginForm Connection -----------------------------------------------------
/*
app.post("/",(req,res)=>{
  var username = req.body.username;
  var password = req.body.password;
  connection.getConnection().then(conn => {
    console.log("connection was made?")
    conn.query("INSERT INTO `Users` (username,password) values (?,?);",[username,password],function(err, rows) {
      if (err) throw err;
      console.log('The solution is: ', rows[0].solution);
      });
  });
  //connection.end();
});*/
//-------------------------------------------------------------------------------







app.use('/',routes);



