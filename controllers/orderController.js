const OrderService = require('../services/orderService');
const { BadRequestError, NotFoundError } = require('../utils/errors');

function handleError(err, res) {
  if (err instanceof BadRequestError) return res.status(400).json({ error: err.message });
  if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
}

async function getAll(_req, res) {
  try {
    const data = await (OrderService.getAll || OrderService.getOrders)();
    return res.status(200).json(data);
  } catch (err) {
    return handleError(err, res);
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params || {};
    const data = await OrderService.getById(id);
    return res.status(200).json(data);
  } catch (err) {
    return handleError(err, res);
  }
}

async function create(req, res) {
  try {
    const payload = req.body || {};
    const data = await (OrderService.create || OrderService.createOrder)(payload);
    return res.status(201).json(data);
  } catch (err) {
    return handleError(err, res);
  }
}

async function update(req, res) {
  try {
    const { id } = req.params || {};
    const updates = req.body || {};
    const data = await (OrderService.update || OrderService.updateOrder)(id, updates);
    return res.status(200).json(data);
  } catch (err) {
    return handleError(err, res);
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params || {};
    await (OrderService.delete || OrderService.deleteOrder)(id);
    return res.status(204).send();
  } catch (err) {
    return handleError(err, res);
  }
}

async function getOrdersByUser(req, res) {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id requerido' });

    const data = await OrderService.getOrdersByUser(user_id);
    return res.status(200).json(data);
  } catch (err) {
    return handleError(err, res);
  }
}


module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
  getOrdersByUser,
  // alias esperados por tests de errores
  getOrders: getAll,
  getOrderById: getById,
  createOrder: create,
  updateOrder: update,
  deleteOrder: remove,
};
