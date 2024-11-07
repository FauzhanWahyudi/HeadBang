const router = require('express').Router();
const Controller = require('../controllers/controller');
const CustomerController = require('../controllers/CustomerController');

router.get('/', CustomerController.home);
router.get('/add', Controller.getAdd);
router.post('/add', Controller.postAdd);

module.exports = router