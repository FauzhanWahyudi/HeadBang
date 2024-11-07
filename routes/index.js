const Controller = require('../controllers/controller');

const router = require('express').Router();

const routerStores = require('./stores');

router.get('/', Controller.home)
router.use('/stores', routerStores)

module.exports = router;