const { getCartByUserId, clearCart } = require("../repositories/cartRepository");
const NotFoundError = require("../utils/notFoundError");
const BadRequestError = require('../utils/badRequestError');
const UnAuthorisedError = require('../utils/unauthorisedError');
const { findUser } = require("../repositories/userRepository");
const { createNewOrder, getOrdersByUserId, getOrderById, updateOrderStatus, getAllOrdersFromDb } = require("../repositories/orderRepository");
const InternalServerError = require("../utils/internalServerError");

const VALID_STATUS_TRANSITIONS = {
    "ORDERED": ["PROCESSING", "CANCELLED"],
    "PROCESSING": ["OUT_FOR_DELIVERY"],
    "OUT_FOR_DELIVERY": ["DELIVERED"],
    "DELIVERED": [],
    "CANCELLED": []
};

async function createOrder(userId, paymentMethod, address) {
    const cart = await getCartByUserId(userId);
    if(!cart) {
        throw new NotFoundError("Cart");
    }
    const user = await findUser({ _id: cart.user});
    if(!user) {
        throw new NotFoundError("User");
    }

    if(cart.items.length === 0) {
        throw new BadRequestError(["Cart is empty, please add some items to the cart"]);
    }

    // Save submitted address to user profile
    if (address) {
        user.address = address;
        await user.save();
    }

    const orderObject = {};

    orderObject.user = cart.user;
    orderObject.items = cart.items.map(cartitem => {
        return {product: cartitem.product._id, quantity: cartitem.quantity}
    });

    orderObject.status = "ORDERED";
    orderObject.totalPrice = 0;

    cart.items.forEach((cartItem) => {
        orderObject.totalPrice += cartItem.quantity * cartItem.product.price;
    });

    orderObject.address = address || user.address;

    // Canonicalize paymentMethod (D003: normalize OFFLINE to CASH)
    let normalizedPayment = paymentMethod ? paymentMethod.toUpperCase().trim() : "CASH";
    if (normalizedPayment === "OFFLINE") {
        normalizedPayment = "CASH";
    }
    if (normalizedPayment !== "CASH" && normalizedPayment !== "ONLINE") {
        throw new BadRequestError(["Invalid payment method. Allowed methods: CASH, ONLINE"]);
    }
    orderObject.paymentMethod = normalizedPayment;

    const order = await createNewOrder(orderObject);

    if(!order) {
        throw new InternalServerError();
    }

    await clearCart(userId);

    return order;
}

async function getAllOrdersCreatedByUser(userId) {
    const orders = await getOrdersByUserId(userId);
    if(!orders) {
        throw new NotFoundError("Orders");
    }
    return orders;
}

async function getOrderDetailsById(orderId, userId, userRole) {
    const order = await getOrderById(orderId);
    if(!order) {
        throw new NotFoundError("Orders");
    }

    // D001: IDOR check - allow access only if owner or admin
    if (userId && userRole !== 'ADMIN') {
        const orderUserId = order.user?._id ? order.user._id.toString() : order.user.toString();
        if (orderUserId !== userId.toString()) {
            throw new UnAuthorisedError();
        }
    }

    return order;
}

async function cancelUserOrder(orderId, userId, userRole) {
    const order = await getOrderById(orderId);
    if (!order) {
        throw new NotFoundError("Orders");
    }

    // D001: IDOR check - allow cancellation only if owner or admin
    if (userId && userRole !== 'ADMIN') {
        const orderUserId = order.user?._id ? order.user._id.toString() : order.user.toString();
        if (orderUserId !== userId.toString()) {
            throw new UnAuthorisedError();
        }
    }

    // D004: Cancellation only allowed when status is ORDERED
    if (order.status !== "ORDERED") {
        throw new BadRequestError([`Cannot cancel order with status ${order.status}. Only ORDERED orders can be cancelled.`]);
    }

    const updatedOrder = await updateOrderStatus(orderId, "CANCELLED");
    return updatedOrder;
}

async function updateOrder(orderId, status) {
    const order = await getOrderById(orderId);
    if (!order) {
        throw new NotFoundError("Orders");
    }

    // D004: Check valid status transitions
    const allowedTransitions = VALID_STATUS_TRANSITIONS[order.status] || [];
    if (!allowedTransitions.includes(status)) {
        throw new BadRequestError([`Invalid status transition from ${order.status} to ${status}`]);
    }

    const updatedOrder = await updateOrderStatus(orderId, status);
    if(!updatedOrder) {
        throw new NotFoundError("Orders");
    }
    return updatedOrder;
}

async function getAllOrders() {
    const orders = await getAllOrdersFromDb();
    if(!orders) {
        throw new NotFoundError("Orders");
    }
    return orders;
}

module.exports = {
    createOrder,
    getAllOrdersCreatedByUser,
    getOrderDetailsById,
    cancelUserOrder,
    updateOrder,
    getAllOrders
}