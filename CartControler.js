const express = require('express');
const Cart = require('../models/Cart');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
    res.json(cart);
});

router.post('/', verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
        cart = new Cart({ userId: req.user.id, products: [{ productId, quantity }] });
    } else {
        const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.products[itemIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
    }
    await cart.save();
    res.status(201).json(cart);
});

router.delete('/:id', verifyToken, async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.id });
    cart.products = cart.products.filter(p => p.productId.toString() !== req.params.id);
    await cart.save();
    res.status(204).send();
});

module.exports = router;
