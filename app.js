import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/flights', (req, res) => {
    if(!req.body.flightNo || !req.body.dest || !req.body.root || !req.body.time || !req.body.plane) {
      return res.status(400).send({
        success: 'false',
        message: 'Missing attribute'
      });
    } 
    const flight = {
        flightNo: req.body.flightNo,
        dest:req.body.dest,
        root: req.body.root,
        time:req.body.time,
        plane:[req.body.plane]
    }
    db.push(flight);
    return res.status(201).send({
      success: 'true',
      message: 'flight added successfully',
      flight
    })
});

// get all flights
app.get('/api/flights', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'flights retrieved successfully',
    flights: db
  })
});

//get single flight
app.get('/api/flights/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    var status = 404;
    db.map((flight) => {
      if (flight.flightNo === id) {
        status = 200;
        return res.status(status).send({
          success: 'true',
          message: 'flight retrieved successfully',
          flight,
        });
      } 
    });
    if(status == 404){
      return res.status(status).send({
        success: 'false',
        message: 'flight does not exist',
       });
    }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});