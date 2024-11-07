const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.stores);
router.get('/listProducts', Controller.products)
router.get('/:id', Controller.storesById);
router.get('/:id/add', Controller.getAdd);
router.post('/:id/add', Controller.postAdd);
router.get('/:id/edit', Controller.getEdit);
router.post('/:id/edit', Controller.postEdit);

module.exports = router