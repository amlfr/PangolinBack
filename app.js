/* Importing express, environment variables and mongoose to set up */

const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const path = require("path");
require("dotenv").config();

const bodyParser = require("body-parser");

/* Importing the differents routes of the API */

const pangolinRoutes = require("./routes/pangolin");

/* Connecting to the mongoDB database  */

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

/* Creating the  express application */

const app = express();

/* Allowing cross origin requests */

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

/* Using the bodyparser for the requests coming */

app.use(bodyParser.json());

/* Setting up the routes for the applications */

app.use("/api/pangolin", pangolinRoutes);

/* Exporting the application */

module.exports = app;
