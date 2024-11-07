const router = require('express').Router();
const CartController = require('../controllers/CartController');
const CustomerController = require('../controllers/CustomerController');
const routerCart = require('./')

router.get('/:userId', CustomerController.home);
router.get('/:userId/cart', CartController.cart) //generate cart kalo ngga ada
router.get('/:userId/cart/add/:productId', CartController.addProductToCart) //generate cart kalo ngga ada


module.exports = router