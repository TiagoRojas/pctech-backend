const express = require('express');

const router = express.Router();
const UserSchema = require('../db/models/userModel');

router.post('/api/register', async (req, res) => {
	console.log(req.body);
	try {
		const user = await UserSchema.create({
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email,
			password: req.body.password,
			role: req.body.role || 'user'
		});
		if (user) {
			res.status(200).json({status: 'User created'});
		}
	} catch (error) {
		res.status(400).json({status: 'User already exists'});
	}
});
router.get('/login', async (req, res) => {
	const {email} = req.body;
	const user = await UserSchema.findOne({email});
	console.log(user);
	if (!user) {
		return res.json({status: 'user not finded'});
	} else {
		res.json(user);
	}
});

module.exports = router;
