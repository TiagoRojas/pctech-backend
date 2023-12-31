const mongoose = require('mongoose');

const {Schema} = mongoose;

const imageSchema = new Schema({
	name: {type: String},
	img: {data: Buffer, contentType: String}
});

module.exports = mongoose.model('Image', imageSchema);
