const { User, Store, Product, Category } = require('../models'); 
const category = require('../models/category');


class Controller {
    static async home(req,res) {
       try {
        res.render('home')
       } catch (error) {
        res.error(error);
       } 
    }

    static async landingPage(req,res) {
        try {
         res.render('landingPage')
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
            });
            res.render('stores', {data});
        } catch (error) {
            res.send(error);
        }
    }

    static async products(req, res) {
        try {
            let {category} = req.query;
            let data = await Product.getProductsByCategory(category);
            res.render('listProduct', {data});
        } catch (error) {
            console.log(error);
            
            res.send(error);
        }
    }

    static async getAdd(req, res) {
        try {
            let data = await Category.findAll();
            res.render('add', {data});
        } catch (error) {
            res.send(error);
        }
    }

    static async postAdd(req, res) {
        try {
            let {name, description, price, stock, CategoryId} = req.body;
            await Product.create({name, description, price, stock, CategoryId});
            res.redirect('/stores');
        } catch (error) {
            res.send(error);
        }
    }
}
module.exports = Controller;