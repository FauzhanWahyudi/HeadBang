const { Op, where } = require('sequelize');
const publishedTime = require('../helpers/publishedTime');
const { User, Store, Product, Cart, Category } = require('../models'); 


class Controller {
    static async home(req,res) {
       try {
        const id = req.session.user.id;
        const {notif} = req.query;
        let user = await User.findByPk(id,{
            include: {
                model: Cart,
                where: {
                    isDone: false,
                }
            },
        }); 
        let products = await Product.findAll();
        res.render('home',{products,user, notif})
       } catch (error) {
        // console.log(error);
        res.send(error);
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
                    model: Store,
                    required: true,
                }
            });
            let userId = req.session.user.id;
            console.log(data);
            res.render('stores', {data, userId});
        } catch (error) {
            res.send(error);
        }
    }

    static async storesById(req, res) {
        try {
            const {id} = req.params;
            const {deleted} = req.query;
            let data = await User.findByPk(id,{
                include: {
                    model: Store,
                    include: {
                        model: Product,
                    }
                }
            });
            console.log(data);
            if(!data.Store){
                res.redirect('/stores/')
            } else {

                const userId = data.id
                // console.log(data.Store);
                res.render('storeDetail', {data, publishedTime, deleted, userId});
            }            
        } catch (error) {
            console.log(error);
            
            res.send(error);
        }
    }

    static async products(req, res) {
        try {
            let { search, category, deleted } = req.query;
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
            // console.log(data);
            let userId = req.session.user.id;
            res.render('listProduct', {data, deleted, userId});
        } catch (error) {
            console.log(error);            
            res.send(error);
        }
    }

    static async getAdd(req, res) {
        try {
            const {id} = req.params;
            let data = await Category.findAll();
            res.render('add', {data, id});
        } catch (error) {
            res.send(error);
        }
    }

    static async postAdd(req, res) {
        try {
            const {id} = req.params;
            let store = await Store.findOne({where: {UserId:id}})
            
            const {name, description, price, stock, CategoryId} = req.body;
            // console.log(req.body)
            await Product.create({name, description, price, stock, CategoryId, StoreId: store.id});
            res.redirect(`/stores/${id}`);
        } catch (error) {
            console.log(error);
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
            const product= await Product.findByPk(id,{
                include: {
                    model: Store
                }
            });
            console.log('111111111111111', product);
            const name = product.name
            const userId = product.Store.UserId
            await product.destroy({})
            
            // res.redirect(`/stores/listProducts?deleted=${name}`);
            res.redirect(`/stores/${userId}?deleted=${name}`);
        } catch (error) {
            res.send(error);
        }
    }
}
module.exports = Controller;