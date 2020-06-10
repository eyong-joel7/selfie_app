'use strict';

//configuring the express server
const express = require('express');
const app  = express();
app.listen(3000, ()=> console.log("listening at Port 3000")); 
app.use(express.static('public'));

//configuring the database

const Datastore = require('nedb')
 const database = new Datastore({ filename: 'database.db' });

database.loadDatabase(function (err) {    // Callback is optional
  // Now commands (insert, delete) will be executed - this function is called first to prepare the database for all other operation. 
});

app.use(express.json({limit: '1mb'})); // server to be able to parse incoming json


// handling incoming post request
app.post('/api', (request, response)=>{
   
    const data = request.body;
    const timeStamp = Date.now();
    data.timestamp = timeStamp;
    // const res = {
    //     status: 'success',
    //     lon: data.longitude,
    //     lat: data.latitude,
    //     timestamp: data.timestamp,
    //     mood: data.mood
    // }
 response.json(data);
 database.insert(data, (err, newDoc) => { 
  });
});

//handling or receiving incoming get request
app.get('/api',(request, response) => {
console.log('getting the response ready');
const data = database.find({}, (err, data) => {
    response.json(data);
    if(err) {
        response.end();
        return;
    }
});


});

  