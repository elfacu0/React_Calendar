const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const homeRoute = require('./routes/home');
app.use('/', homeRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('connecting');
    console.log(mongoose.connection.readyState);
    console.log(
        mongoose.connection.readyState === 1
            ? 'CONNECTION SUCCESSFUL'
            : 'ERROR IN CONNECTION'
    );
});

app.listen(port);
console.log('App is listening on port ' + port);
