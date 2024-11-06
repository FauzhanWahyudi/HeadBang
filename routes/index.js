const Controller = require('../controllers/controller');
const UserController = require('../controllers/UserController');

const router = require('express').Router();

router.get('/', Controller.home)

// get register
router.get('/register', UserController.registerForm)
// post register
router.post('/register', UserController.registerHandler)
// get login
router.get('/login', UserController.loginForm)


module.exports = router;