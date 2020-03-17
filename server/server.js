const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const URI = process.env.ATLAS_URI;

// connect to db
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true })
	.then( () => console.log('MongoDB connected'))
	.catch( err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));