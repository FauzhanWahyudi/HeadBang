const router = require('express').Router();
const CartController = require('../controllers/CartController');
const CustomerController = require('../controllers/CustomerController');
const routerCart = require('./')

router.get('/:userId', CustomerController.home);
router.get('/:userId/cart', CartController.cart) //generate cart kalo ngga ada
router.get('/:userId/cart/add/:productId', CartController.addProductToCart) //generate cart kalo ngga ada
router.get('/:userId/cart/:cartId/delete/:productId', CartController.removeProductFromCart) //generate cart kalo ngga ada
router.get('/:userId/cart/:cartId/delete/:productId/:cartProductId', CartController.removeOneProductFromCart) //generate cart kalo ngga ada
router.get('/:userId/cart/:cartId/delete/:productId/:cartProductId', CartController.removeOneProductFromCart) //generate cart kalo ngga ada
router.post('/:userId/cart/:cartId/updateCart', CartController.updateCartPrice) //generate cart kalo ngga ada
router.get('/:userId/cart/:cartId/checkout', CartController.checkout) //generate cart kalo ngga ada
router.get('/:userId/cart/:cartId/checkout/success', CartController.checkout) //generate cart kalo ngga ada

module.exports = router