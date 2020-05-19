const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const Users = require('./routes/Users');
const Challenge1 = require('./routes/challenge1_users');
const Challenge3 = require('./routes/challenge3_users');
const Post = require('./routes/Post');

require('dotenv').config();

const app = express();

// @todo disable javascript in $where clauses

app.use(bodyParser.json());

app.use('/Login', Users);
app.use('/Challenge1', Challenge1);
app.use('/Challenge3', Challenge3);
app.use('/Forums', Post);


const URI = process.env.ATLAS_URI;

// connect to db
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true })
	.then( () => console.log('MongoDB connected'))
	.catch( err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));