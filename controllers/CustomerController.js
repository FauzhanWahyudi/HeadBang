class CustomerController{
    static async home(req,res) {
        try {
            res.redirect('/home')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}
module.exports = CustomerController;