const express = require('express');
const mongoose = require('mongoose');   //import mongoose
const cors = require("cors");
const heroes = require('./routes/heroes');
const home = require('./routes/home');
const authenticator = require('./middlewares/authenticator');
const email = require('./middlewares/email');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(authenticator);
app.use(email);
app.use('/api/heroes', heroes);
app.use('/', home);

mongoose
    .connect("mongodb://localhost/herodb", { useNewUrlParser: true, useUnifiedTopology: true })    //connection string
    .then(() => console.log("Connected to Db successfully ..."))
    .catch(err => console.log("Error has occured while connecting to db : ", err));


app.listen(PORT, function () {
    console.log("Listening on Port - " + PORT);
});