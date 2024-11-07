const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.stores);
router.get('/listProducts', Controller.products)
router.get('/add', Controller.getAdd);
router.post('/add', Controller.postAdd);
router.get('/:id/edit', Controller.getEdit);
router.post('/:id/edit', Controller.postEdit);
// router.get('/:id/delete', Controller.delete);
router.get('/:id/delete', Controller.delete);

module.exports = router