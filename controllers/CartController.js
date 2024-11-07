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
            const CartId = user.Carts[0].id;  
            //get all ProductId in Cart
            let [...products] = await CartProduct.findAll({
                where:{
                    CartId
                }
            })
            
            //get all item added to cart
            products = products.map(el => {
                let productName = user.Carts[0].Products.find(e => e.id == el.ProductId)
                return productName
            })
            res.render('cart', {user,toIDR, products})
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
}
module.exports = CartController;