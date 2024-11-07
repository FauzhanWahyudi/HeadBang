const bcrypt = require('bcryptjs');
const {User, Store} = require('../models');
const { mailOptions, sendVerification } = require('../helpers/emailVerification');



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

    //check if emial is registered
    // if true, then compare plain password with hased password
        //redirect to home
    // if false, error can't go to home
    //add user to db
    static async loginHandler(req,res) {
        try {
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

                    //direct route accoring to role
                    if(user.role == 'seller'){
                        res.redirect(`/stores/${user.id}`)
                    } else {
                        res.redirect('/home')
                    }
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
            let {id} = await User.create({email, password, role})  

            //send verification email
            let emailVerification = mailOptions(email);
            sendVerification(emailVerification);

            if(role == 'seller') {
                res.redirect(`/regisStore?UserId=${id}`)
            } else {
                res.redirect('/login') 
            }
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

    static async regisStore(req,res) {
        try {
            let {error, UserId} = req.query;
            res.render('regisStore',  {error, UserId} )
        } catch (error) {
                console.log(error);
                res.send(error)
        }
    }

    static async regisStoreHandler(req,res) {
        try {
            //add user to db
            const {UserId} = req.query;
            const {name} = req.body;
            await Store.create({name, UserId})
            res.redirect('/login') 
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                let err = error.errors.map(el => el.message)
                res.redirect(`/register?error=${err}`) 
            }else if (error.name = "SequelizeUniqueConstraintError") {
                let err = 'Store name is not available'
                res.redirect(`/regisStore?error=${err}`) 
            } else {
                console.log(error);
                res.send(error)
            }
        }
    }

    static async logout(req,res) {
        try {
            req.session.destroy(function(err) {
                res.clearCookie('connect.sid');
                // cannot access session here
                if(err) res.send(err)
                    else res.redirect('/login')
              })
        } catch (error) {
                console.log(error);
                res.send(error)
        }
    }

    static async verify(req,res) {
        try {
            const {email} = req.params;
            let user = await User.findOne({email})
            user.update({isValidate: true})
            res.redirect(`/?veriy=Success`)
        } catch (error) {
                console.log(error);
                res.send(error)
        }
    }
}

module.exports = UserController;