const Controller = require('../controllers/controller');
const UserController = require('../controllers/UserController');
const { isLogin, isSeller } = require('../middleware/auth');

const router = require('express').Router();
const routerStores = require('./stores');
const routerCustomer = require('./customer');

// register
router.get('/register', UserController.registerForm)
router.post('/register', UserController.registerHandler)
router.get('/regisStore', UserController.regisStore)
router.post('/regisStore', UserController.regisStoreHandler)
// login
router.get('/login', UserController.loginForm)
router.post('/login', UserController.loginHandler)

//verification email
router.get('/verify/:email', UserController.verify)


//landing page 
router.get('/', Controller.landingPage)


//all router after this, will only run if router.use if allow next()
// router.use(isLogin);

//go to store
// router.use('/stores',isSeller, routerStores),
router.use('/stores', routerStores),

//go to customer page
router.use('/customer', routerCustomer)


//user Home
router.get('/home', Controller.home) //just check if login so can gooo


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