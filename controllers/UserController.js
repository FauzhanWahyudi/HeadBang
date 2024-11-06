const { compareSync } = require("bcryptjs");
const {User} = require('../models')

class UserController {

    static async loginForm(req,res) {
        try {
            res.render('registerForm')
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                let err = error.errors.map(el => el.messange)
                res.send(err)
            } else {
                console.log(error);
                res.send(error)
            }
        }
    }

    static async registerForm(req,res) {
        try {
            res.render('registerForm')
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                let err = error.errors.map(el => el.messange)
                res.send(err)
            } else {
                console.log(error);
                res.send(error)
            }
        }
    }

    static async registerHandler(req,res) {
        try {
            //add user to db
            const {email, password, role} = req.body;
            await User.create({email, password, role})
            res.redirect('/login') 
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                let err = error.errors.map(el => el.message)
                res.send(err)
            } else {
                console.log(error);
                res.send(error)
            }
        }
    }
}

module.exports = UserController;