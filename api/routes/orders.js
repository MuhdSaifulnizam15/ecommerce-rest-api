const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrderController = require('../controllers/orders');

router.get('/', checkAuth, OrderController.getAllOrders);

router.post('/', checkAuth, OrderController.createOneOrder);

router.get('/:orderId', checkAuth, OrderController.getOneOrder);

router.patch('/:orderId', checkAuth, OrderController.updateOneOrder);

router.delete('/:orderId', checkAuth, OrderController.deleteOneOrder);

module.exports = router;