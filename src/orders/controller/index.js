import ordersService from "../../orders/service/index.js";
import { mapOrderResponse, mapOrders } from "../mappers/index.js";

const getOrders = async (_, res) => {
  try {
    const result = await ordersService.getOrders();
    const response = mapOrders(result);
    return res.status(200).json({
      message: "Orders retrieved successfully",
      data: response,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ordersService.getOrderDetailsById({ id });

    if (!result) return res.status(200).json({ message: "Order not found" });
    const resMapped = mapOrderResponse(result);
    return res.status(200).json({
      message: "Order retrieved successfully",
      data: resMapped,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ordersService.getOrderById({ id });

    if (!result) return res.status(200).json({ message: "Order not found" });

    return res.status(200).json({
      message: "Order retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addOrder = async (req, res) => {
  try {
    const orderPayload = { ...req.body };
    console.log(
      "🚀 ~ file: index.js:55 ~ addOrder ~ orderPayload:",
      orderPayload
    );

    await ordersService.addOrder({ order: orderPayload });
    return res.status(200).json({
      message: "Order added successfull",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addEditOrder = async (req, res) => {
  try {
    if (req.params.id) {
      const { id } = req.params;
      const orderUpdatePayload = { ...req.body };

      await ordersService.updateOrderDetails({
        order: orderUpdatePayload,
        id,
      });

      return res.status(200).json({
        message: "Orders updated successfully",
      });
    }

    const orderPayload = { ...req.body };
    await ordersService.addOrderDetails({ order: orderPayload });
    return res.status(200).json({
      message: "Order added successfull",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orderUpdatePayload = { ...req.body };
    const result = await ordersService.updateOrder({
      id,
      order: orderUpdatePayload,
    });
    return res.status(200).json({
      message: "Order updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await ordersService.deleteOrder({ id });
    return res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getOrders,
  getOrderById,
  getOrderDetailsById,
  addOrder,
  addEditOrder,
  updateOrder,
  deleteOrder,
};
