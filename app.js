const express = require('express');
const heroes = require('./routes/heroes');
const home = require('./routes/home');
const authenticator = require('./middlewares/authenticator');
const email = require('./middlewares/email');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(authenticator);
app.use(email);
app.use('/api/heroes', heroes);
app.use('/', home);

app.listen(PORT, function () {
    console.log("Listening on Port - " + PORT);
});