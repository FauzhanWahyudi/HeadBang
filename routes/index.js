const Controller = require('../controllers/controller');
const UserController = require('../controllers/UserController');
const { isLogin, isAdmin, isSeller } = require('../middleware/auth');

const router = require('express').Router();
const routerStores = require('./stores');

// register
router.get('/register', UserController.registerForm)
router.post('/register', UserController.registerHandler)
// login
router.get('/login', UserController.loginForm)
router.post('/login', UserController.loginHandler)


//all router after this, will only run if router.use if allow next()
router.use(isLogin);

//landing page
router.get('/',Controller.home) //just check if login so can gooo

//go to store
router.use('/stores',isSeller, routerStores)


//buat logout bisa
router.get('/logout', UserController.logout)

module.exports = router;



//   NOTES:--------------------------------
// router.get('/',isAdmin, Controller.home) //check if admin to go to home


//bisa juga
// const test = (req, res, next) => {
//     console.log('Time:', Date.now())
//     next()
// };
// router.get('/',test, Controller.home)