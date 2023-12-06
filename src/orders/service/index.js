import ordersRepository from "../repository/index.js";

const getOrders = async () => {
  return await ordersRepository.getOrders();
};

const getOrderById = async ({ id }) => {
  const result = await ordersRepository.getOrderById({ id });
  if (!result) {
    return null;
  }
  return result;
};

const getOrderDetailsById = async ({ id }) => {
  const result = await ordersRepository.getOrderDetailsById({ id });
  if (!result) {
    return null;
  }
  return result;
};

const addOrder = async ({ order }) => {
  await ordersRepository.addOrder({ order });
};

const updateOrder = async ({ order, id }) => {
  await ordersRepository.updateOrder({ order, id });
};

const deleteOrder = async ({ id }) => {
  await ordersRepository.deleteOrder({ id });
};

const updateOrderDetails = async ({ order, id }) => {
  await ordersRepository.updateOrderDetails({ order, id });
};

const addOrderDetails = async ({ id, order }) => {
  await ordersRepository.addOrderDetails({ id, order });
};

export default {
  getOrders,
  addOrder,
  getOrderDetailsById,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderDetails,
  addOrderDetails,
};
