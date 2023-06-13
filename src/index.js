const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const productRoute = require('./routes/productRoute');
const loginRoute = require('./routes/userRoute');
const startDb = require('./db/index');

startDb();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(loginRoute);
app.use(productRoute);

app.listen(process.env.SERVER_PORT);
console.log('server on port ' + process.env.SERVER_PORT);
