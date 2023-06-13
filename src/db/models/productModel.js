const mongoose = require('mongoose');

const {Schema} = mongoose;

const productSchema = new Schema({
	title: {type: String, require: true}, // String is shorthand for {type: String}
	description: {type: String, require: true},
	price: {type: Number, require: true},
	stock: {type: Number, require: true},
	pictures: [{url: {type: String}, name: {type: String}}],
	details: {type: Object, default: {}},
	dateAdded: {type: String, require: true}
});

const product = mongoose.model('product', productSchema);
module.exports = product;
