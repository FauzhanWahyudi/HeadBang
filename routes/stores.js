const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.stores);
router.get('/add', Controller.getAdd);
router.post('/add', Controller.postAdd);

module.exports = router