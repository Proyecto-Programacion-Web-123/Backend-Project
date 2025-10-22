const knex = require('../db/knex');
const OrderModel = require('../models/orderModel');
const { BadRequestError, NotFoundError } = require('../utils/errors');
const OrderDto = require('../dto/orderDTO');

const OrderService = {
  getOrders: async () => {
    const orders = await OrderModel.findAll();
    return OrderDto.map(orders);
  },

  getById: async (id) => { // ← AÑADE ESTA FUNCIÓN (alias de getOrderById)
    if (!id) throw new BadRequestError('Order ID is required');
    const order = await OrderModel.findById(id);
    if (!order) throw new NotFoundError('Order not found');
    return new OrderDto(order);
  },

  getOrderById: async (id) => {
    if (!id) throw new BadRequestError('Order ID is required');
    const order = await OrderModel.findById(id);
    if (!order) throw new NotFoundError('Order not found');
    return new OrderDto(order);
  },

  getOrdersByUser: async (user_id) => {
    if (!user_id) throw new BadRequestError('User ID is required');

    // Traer órdenes del usuario
    const orders = await knex('orders')
      .where('id_user', user_id)
      .orderBy('created_at', 'desc');

    const detailedOrders = [];

    for (const order of orders) {
      // Traer los productos de cada orden desde order_details
      const items = await knex('order_details')
        .where('id_order', order.id_order)
        .join('products', 'order_details.id_product', 'products.id_product') // ← CAMBIADO A 'products'
        .select(
          'products.id_product',
          'products.name',
          'products.price',
          'products.image_url',
          'order_details.quantity'
        );

      detailedOrders.push({
        ...order,
        items,
      });
    }

    return detailedOrders;
  },

  createOrder: async ({ id_user, date, total }) => {
    if (!id_user || !date || !total) {
      throw new BadRequestError('User, date and total are required');
    }
    const order = await OrderModel.create({ id_user, date, total });
    return new OrderDto(order);
  },

  updateOrder: async (id, updates) => {
    if (!id) throw new BadRequestError('Order ID is required');
    const order = await OrderModel.update(id, updates);
    if (!order) throw new NotFoundError('Order not found');
    return new OrderDto(order);
  },

  deleteOrder: async (id) => {
    if (!id) throw new BadRequestError('Order ID is required');
    const order = await OrderModel.delete(id);
    if (!order) throw new NotFoundError('Order not found');
    return new OrderDto(order);
  },
};

module.exports = OrderService;