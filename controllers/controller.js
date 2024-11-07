const { User, Store, Product, Category } = require('../models'); 
const { Op } = require('sequelize');


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
            });
            res.render('stores', {data});
        } catch (error) {
            res.send(error);
        }
    }

    static async products(req, res) {
        try {
            let { search, category } = req.query;
            let option = {};
            option.where = {};

            let data = null;
            if(search) {
                option.where.name = {
                [Op.iLike]: `%${search}%`
                }
            }
            
            if(category){
                data = await Product.getProductsByCategory(category);
            } else {
                data = await Product.findAll(option)
            }
            console.log(data);
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
            const {name, description, price, stock, CategoryId} = req.body;
            await Product.create({name, description, price, stock, CategoryId});
            res.redirect('/stores');
        } catch (error) {
            res.send(error);
        }
    }

    static async getEdit(req, res) {
        try {
            let {id} = req.params;
            let data = await Product.findByPk(id, {
                include : {
                    model : Category
                }
            });
            res.render('edit', {data});
        } catch (error) {
            res.send(error);
        }
    }

    static async postEdit(req, res) {
        try {
            const {id} = req.params;
            const {name, description, price, stock, CategoryId} = req.body;
            await Product.update({name, description, price, stock, CategoryId}, {
                where : {id}
            });
            res.redirect('/stores/listProducts');
        } catch (error) {
            res.send(error);
        }
    }

    static async delete(req, res) {
        try {
            const {id} = req.params;
            const {name} = await Product.findByPk(id);
            await Product.destroy({
                where : {
                    id
                }
            })
            res.redirect(`/stores/${id}?deleted=${name}`);
        } catch (error) {
            res.send(error);
        }
    }
}
module.exports = Controller;