
class Controller {
    static async home(req,res) {
       try {
        res.render('home')
       } catch (error) {
        console.log(error)
        res.error(error)
       } 
    }
}
module.exports = Controller;