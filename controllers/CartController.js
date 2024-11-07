const { User, Store, Product, Category, Cart } = require('../models'); 
class CartController {
    static async cart(req,res) {
        try {
            const {userId} = req.params;
            let user = User.findByPk(userId,{
                include: {
                    model: Cart
                }
            })
            res.render('cart', {user})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}
module.exports = CartController;