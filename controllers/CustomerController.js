const { Cart, UserCart } = require('../models'); 


class CustomerController{
    static async home(req,res) {
        try {
            //bikin cart
            const {userId} = req.params
            let cart = await Cart.create({price:0, bonus:0})
            await UserCart.create({UserId: userId, CartId:cart.id})
            res.redirect('/home')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}
module.exports = CustomerController;