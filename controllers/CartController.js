const { User, Store, CartProduct, Product, Category, Cart } = require('../models'); 
const toIDR = require('../helpers/idr');
const generateQR = require('../helpers/generateQR');
class CartController {
    static async cart(req,res) {
        try {
            const {userId} = req.params;
            const {...user} = await User.findByPk(userId,{
                include: {
                    model: Cart,
                    through: {attributes: []},
                    include: {
                        model: Product,
                        through: {attributes: []},
                    },
                    where:{
                        isDone: false
                    }
                }
            })
            let cart = user.Carts[0];  

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
                    where:{
                        isDone: false
                    }
                },
            })
            let CartId = user.Carts[0].id
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
            await cart.update({price})
            res.redirect(`/customer/${userId}/cart/${cartId}/checkout`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    
    static async checkout(req,res) {
        try {
            const {userId, cartId} = req.params;
            let cart = await Cart.findByPk(cartId)
            let qr = await generateQR('https://awsimages.detik.net.id/community/media/visual/2023/10/27/meme-presentasi-1_169.jpeg?w=600&q=90')
            res.render('checkout',{userId, cart, qr})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async checkoutSuccess(req,res) {
        try {
            const {userId, cartId} = req.params;

            //change cart to done
            let cart = await Cart.findByPk(cartId)
            await cart.update({isDone:true});

            //add user bonus
            let {price} = req.body
            let bonusPoint = Number(price)*10;
            console.log(bonusPoint);
            
            const user = await User.findByPk(userId)
            await user.increment({
                point: bonusPoint
            });
            console.log(user);
            
            //go to home
            const notif = 'Your purchase will be proccess, Thanks for Trust in Us'
            res.redirect(`/customer/${userId}?notif=${notif}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}
module.exports = CartController;