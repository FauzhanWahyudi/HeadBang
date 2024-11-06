const bcrypt = require('bcryptjs');
const {User} = require('../models');


class UserController {

    static async loginForm(req,res) {
        try {
            let {error} = req.query;
            res.render('login', {error})
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
            const error = 'Invalid Email or Password'
            if(user){
                //check password
                const checkPassword = bcrypt.compareSync(password, user.password);
                if(checkPassword){
                    //kalo berhasil
                    req.session.user ={ 
                        id: user.id,
                        role: user.role,
                    }; //set session key userId dengan nilai user.id
                    res.redirect('/')
                } else {
                    res.redirect(`/login?error=${error}`) 
                }
            } else {
                res.redirect(`/login?error=${error}`) 
            }
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                let err = error.errors.map(el => el.message)
                res.redirect(`/login?error=${err}`) 
            } else {
                console.log(error);
                res.send(error)
            }
        }
    }

    static async registerForm(req,res) {
        try {
            let {error} = req.query;
            res.render('registerForm',  {error} )
        } catch (error) {
                console.log(error);
                res.send(error)
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
                res.redirect(`/register?error=${err}`) 
            } else {
                console.log(error);
                res.send(error)
            }
        }
    }

    static async logout(req,res) {
        try {
            req.session.destroy(function(err) {
                // cannot access session here
                if(err) res.send(err)
                    else res.redirect('/login')
              })
        } catch (error) {
                console.log(error);
                res.send(error)
        }
    }
}

module.exports = UserController;