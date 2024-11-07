const { User, Cart, UserCart } = require('../models'); 


class CustomerController{
    static async home(req,res) {
        try {
            //bikin cart
            const {userId} = req.params
            const user = await User.findByPk(userId,{
                include:{
                    model: Cart,
                    where:{
                        isDone: false,
                    }
                }
            })
            if(!user){
                console.log('test salah');
                let cart = await Cart.create({price:0, bonus: 0})
                await UserCart.create({UserId: userId, CartId:cart.id})
                return
            }
            
            //update bonus to cart
            let bonus = user.point > 1000 ? 10 : 0;
            let cart = await Cart.findByPk(user.Carts[0].id)
            await cart.update({bonus})

            const {notif} = req.query;
            res.redirect(`/home?notif=${notif}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}
module.exports = CustomerController;