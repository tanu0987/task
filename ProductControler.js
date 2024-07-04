const express = require('express');
const Product = require('../models/Product');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

router.post('/', verifyToken, verifyAdmin, async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
});

router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
});

router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
