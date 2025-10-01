const OrderModel = require('../models/orderModel');
const { BadRequestError, NotFoundError } = require('../utils/errors');
const OrderDto = require('../dto/orderDTO');

const OrderService = {
    getOrders: async () => {
        const orders = await OrderModel.findAll();
        return OrderDto.map(orders);
    },

    getOrderById: async (id) => {
        if (!id) throw new BadRequestError('Order ID is required');
        const order = await OrderModel.findById(id);
        if (!order) throw new NotFoundError('Order not found');
        return new OrderDto(order);
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
