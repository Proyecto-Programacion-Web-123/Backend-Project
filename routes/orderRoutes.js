const express = require('express');
const OrderController = require('../controllers/orderController');
const router = express.Router();

router.get('/', OrderController.getAll);
router.get('/user', OrderController.getOrdersByUser);
router.get('/:id', OrderController.getById);
router.post('/', OrderController.create);
router.put('/:id', OrderController.update);
router.delete('/:id', OrderController.delete);

module.exports = router;