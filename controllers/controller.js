
class Controller {
    static async home(req,res) {
       try {
        res.send('Landing Page')
       } catch (error) {
        console.log(error)
        res.error(error)
       } 
    }
}
module.exports = Controller;