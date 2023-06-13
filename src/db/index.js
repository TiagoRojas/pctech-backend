const mongoose = require('mongoose');
require('dotenv').config();

function startDb() {
	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => console.log('database connected'))
		.catch((er) => console.log('error ' + er));
}
module.exports = startDb;
