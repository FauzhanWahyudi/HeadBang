const { compareSync } = require("bcryptjs");

class UserController {
    static async registerForm(req,res) {
        try {
            res.render('registerForm')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async registerHandler(req,res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = UserController;