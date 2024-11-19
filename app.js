const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

// MongoDB credentials (Replace with your actual credentials)
const MONGO_URI = 'mongodb+srv://naveenhima91:ehpUIG1PAZcPLDaM@naveen.ywia7.mongodb.net/?retryWrites=true&w=majority&appName=Naveen';
const MONGO_USERNAME = 'naveenhima91';
const MONGO_PASSWORD = 'ehpUIG1PAZcPLDaM';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err) {
    if (err) {
        console.log("Error connecting to MongoDB: " + err);
    } else {
        // Uncomment for debugging or success message
        // console.log("MongoDB Connection Successful");
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
