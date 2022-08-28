const path = require('path');
const express = require('express');
const cors = require('cors');

const router = require('./routers');

const app = express();

require('./helpers/apiDocs')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// On lève les restrictions pour le côté front
app.use(cors({
    origin: '*',
}));

app.use(router);

module.exports = app;
