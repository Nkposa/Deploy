const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

// Read MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI environment variable is not set.");
  process.exit(1);  // Exit the process if the MongoDB URI is not set
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

// MongoDB URI
const MONGO_URI = 'mongodb+srv://naveenhima91:ehpUlGIPAZcPLDaM@naveen.ywia7.mongodb.net/test?retryWrites=true&w=majority';  // Mongo URI string

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,  // Fix deprecation warning for indexes
    useFindAndModify: false, // Fix deprecation warning for findAndModify
}, function(err) {
    if (err) {
        console.log('Error connecting to MongoDB: ' + err);
    } else {
        console.log('MongoDB Connection Successful');
    }
});

var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});

var planetModel = mongoose.model('planets', dataSchema);

// Endpoint to fetch planet data by ID
app.post('/planet', function(req, res) {
    planetModel.findOne({
        id: req.body.id
    }, function(err, planetData) {
        if (err) {
            res.status(500).send('Error in Planet Data');
        } else {
            res.send(planetData);
        }
    });
});

// Serve index.html on the root route
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Get system information (OS hostname and environment)
app.get('/os', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        'os': OS.hostname(),
        'env': process.env.NODE_ENV
    });
});

// Check server status (live)
app.get('/live', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        'status': 'live'
    });
});

// Check server readiness
app.get('/ready', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        'status': 'ready'
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server successfully running on port - 3000');
});

module.exports = app;


var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});

var planetModel = mongoose.model('planets', dataSchema);

// Endpoint to fetch planet data by ID
app.post('/planet', function(req, res) {
    planetModel.findOne({
        id: req.body.id
    }, function(err, planetData) {
        if (err) {
            res.status(500).send("Error in Planet Data");
        } else {
            res.send(planetData);
        }
    });
});

// Serve index.html on the root route
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Get system information (OS hostname and environment)
app.get('/os', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV
    });
});

// Check server status (live)
app.get('/live', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "live"
    });
});

// Check server readiness
app.get('/ready', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "ready"
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server successfully running on port - 3000");
});

module.exports = app;
