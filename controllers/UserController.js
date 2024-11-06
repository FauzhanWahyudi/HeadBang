const bcrypt = require('bcryptjs');
const {User} = require('../models');


class UserController {

    static async loginForm(req,res) {
        try {
            res.render('login')
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

    static async loginHandler(req,res) {
        try {
            //check if emial is registered
            // if true, then compare plain password with hased password
                //redirect to home
            // if false, error can't go to home
            //add user to db
            const {email, password} = req.body;
            let user = await User.findOne({where: {
                email
            }})
            if(user){
                const isRegistered = bcrypt.compareSync(password, user.password);
                if(isRegistered){
                    res.redirect('/')
                } else {
                    const error = 'Invalid Email or Password'
                    res.redirect(`/login?error=${error}`) 
                }
            }
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