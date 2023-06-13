const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const {Schema} = mongoose;

const userSchema = new Schema({
	name: {type: String, required: true},
	lastname: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	role: {type: String, required: true, default: 'user'}
});
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcryptjs.hash(this.password, 10);
});

const Users = mongoose.model.Users || mongoose.model('Users', userSchema);
module.exports = Users;
