const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
	destination: async function (req, file, cb) {
		if (!fs.existsSync(`src/uploads/${req.body.title}`)) {
			fs.mkdirSync(`src/uploads/${req.body.title}`);
		}
		cb(null, `src/uploads/${req.body.title}`);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	}
});
const upload = multer({storage: storage});

const imgSchema = require('../db/models/imageModel');

router.get('/products', async (req, res) => {
	const Product = require('../db/models/productModel');
	const products = await Product.find().limit(req.query.limit);
	if (products === []) {
		res.json({data: 'Products o Base de datos no disponible/s', ok: false});
	} else res.send(products);
});

router.post('/a', upload.array('pictures', 12), async function (req, res, next) {
	console.log(pictures);
	// req.files.map(()=>{})
});

router.post('/admin/addProduct', upload.array('pictures', 8), async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const details = await JSON.parse(req.body?.details);
	const ProductSchema = require('../db/models/productModel');
	const picturesReq = req.files;
	if (!picturesReq) {
		return res.send('Error, Faltan datos o estan mal colocados');
	}
	const pictures = [];
	picturesReq.map((item, i) => {
		console.log(item);
		pictures.push({
			name: item.filename,
			url: path.join(`${__dirname}/../uploads/${req.body.title}/${item.filename}`)
		});
	});
	const newProduct = new ProductSchema({
		title: req.body.title,
		stock: req.body.stock,
		description: req.body.description,
		price: req.body.price,
		pictures,
		details,
		dateAdded: new Date()
	});
	newProduct.save({});
	res.send('product uploaded');
});

module.exports = router;
