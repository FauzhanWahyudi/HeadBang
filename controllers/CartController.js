const { User, Store, CartProduct, Product, Category, Cart } = require('../models'); 
const toIDR = require('../helpers/idr');
class CartController {
    static async cart(req,res) {
        try {
            const {userId} = req.params;
            let {...user} = await User.findByPk(userId,{
                include: {
                    model: Cart,
                    through: {attributes: []},
                    include: {
                        model: Product,
                        through: {attributes: []},
                    }
                }
            })
            const cart = user.Carts[0];  
            //get all ProductId in Cart
            let [...products] = await CartProduct.findAll({
                where:{
                    CartId: cart.id
                }
            })
            
            //get all item added to cart
            products = products.map(el => {
                let productName = user.Carts[0].Products.find(e => e.id == el.ProductId)
                productName.CartId = el.id
                return productName
            })
            console.log(products);
            
            res.render('cart', {userId, cart,toIDR, products})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async addProductToCart(req,res) {
        try {
            const {userId, productId} = req.params;
            let user = await User.findByPk(userId,{
                include: {
                    model: Cart,
                    through: {attributes: []},
                }
            })
            let CartId = user.Carts[0].id
            // console.log(CartId, productId);
            //bikin junction
            await CartProduct.create({CartId, ProductId: productId});
            res.redirect('/home')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async removeProductFromCart(req,res) {
        try {
            const {userId, cartId, productId} = req.params;
            await CartProduct.destroy({
                where: {
                  ProductId: productId,
                },
              });
            res.redirect(`/customer/${userId}/cart/`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async removeOneProductFromCart(req,res) {
        try {
            const {userId, cartId, productId, cartProductId} = req.params;
            await CartProduct.destroy({
                where: {
                  id: cartProductId,
                },
              });
            res.redirect(`/customer/${userId}/cart/`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async updateCartPrice(req,res) {
        try {
            const {userId, cartId} = req.params;
            let {price} = req.body
            let cart = await Cart.findByPk(cartId)
            cart.update({price})
            res.redirect(`/customer/${userId}/cart/${cartId}/checkout`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    
    static async checkout(req,res) {
        try {
            const {userId, cartId} = req.params;
            res.render('checkout',{userId, cartId})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async checkoutSuccess(req,res) {
        try {
            const {userId, cartId} = req.params;
            res.redirect(`/customer/${userId}/cart/${cartId}/checkout`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}
module.exports = CartController;