const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const productRoute = require('./routes/productRoute');
const loginRoute = require('./routes/userRoute');
const startDb = require('./db/index');
const port = process.env.PORT || 3000;
startDb();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(loginRoute);
app.use(productRoute);

app.listen(port);
console.log('server on port ' + port);
