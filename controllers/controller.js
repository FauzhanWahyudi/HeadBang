const { User, Store, Product } = require('../models'); 


class Controller {
    static async home(req,res) {
       try {
        res.render('home')
       } catch (error) {
        console.log(error)
        res.error(error)
       } 
    }

    static async landingPage(req,res) {
        try {
         let {verify} = req.query;
         res.render('landingPage', {verify})
        } catch (error) {
         console.log(error)
         res.error(error)
        } 
     }

    static async stores(req, res) {
        try {
            let data = await User.findAll({
                include: {
                    model: Store
                }
            })
            res.render('stores', {data});
        } catch (error) {
            res.send(error);
        }
    }

    static async getAdd(req, res) {
        try {
            let data = await Product.findAll()
            res.render('add', {data});
        } catch (error) {
            console.log(error);
            
            res.send(error);
        }
    }

    static async postAdd(req, res) {
        try {
            let {name, description, price, stock, CategoryId} = req.body;
            await Product.create({name, description, price, stock, CategoryId});
            res.redirect('stores');
        } catch (error) {
            console.log(error);

            res.send(error);
        }
    }
}
module.exports = Controller;