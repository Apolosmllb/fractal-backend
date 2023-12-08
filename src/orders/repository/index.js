import pool from "../../database.js";

const getOrders = async () => {
  const [result] = await pool.query(
    `SELECT  orders.*, 
    order_details.qty, 
    order_details.unit_price as detail_unit_price, 
    order_details.total_price, 
    products.name as product_name, 
    products.unit_price as product_unit_price,
    products.id as product_id
    FROM orders 
    INNER JOIN order_details ON orders.id = order_details.order_id 
    INNER JOIN products ON order_details.product_id = products.id`
  );
  return result;
};
const getOrderDetailsById = async ({ id }) => {
  const query = `
    SELECT orders.*, 
    order_details.qty, 
    order_details.unit_price as detail_unit_price, 
    order_details.total_price, 
    products.name as product_name, 
    products.id as product_id,
    products.unit_price as product_unit_price
    FROM orders
    INNER JOIN order_details ON orders.id = order_details.order_id
    INNER JOIN products ON order_details.product_id = products.id
    WHERE orders.id = ?
  `;
  const [rows] = await pool.query(query, [id]);
  return rows;
};

const addOrder = async ({ order: payload }) => {
  try {
    const { order, orderDetails } = payload;

    await pool.query("START TRANSACTION");

    const insertOrderQuery =
      "INSERT INTO orders (order_num, createdAT, final_price) VALUES (?, ?, ?)";
    const [orderResult] = await pool.query(insertOrderQuery, [
      order.order_num,
      order.createdAT,
      order.final_price,
    ]);

    const orderId = orderResult.insertId;

    const insertOrderDetailsQuery =
      "INSERT INTO order_details (order_id, product_id, qty, unit_price, total_price) VALUES (?, ?, ?, ?, ?)";
    for (const detail of orderDetails) {
      //current unit price of the product
      const [rows] = await pool.query(
        "SELECT unit_price FROM products WHERE id = ?",
        [detail.product_id]
      );
      const unit_price = rows[0].unit_price;

      await pool.query(insertOrderDetailsQuery, [
        orderId,
        detail.product_id,
        detail.qty,
        unit_price,
        detail.total_price,
      ]);
    }

    await pool.query("COMMIT");
  } catch (error) {
    await pool.query("ROLLBACK");
    throw new Error(error);
  }
};

const getOrderById = async ({ id }) => {
  const [result] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
  return result?.[0];
};

const updateOrder = async ({ id, order: payload }) => {
  try {
    const { order, orderDetails } = payload;
    await pool.query("START TRANSACTION");

    const updateOrderQuery =
      "UPDATE orders SET order_num = ?, createdAT = ?, final_price = ? WHERE id = ?";
    await pool.query(updateOrderQuery, [
      order.order_num,
      order.createdAT,
      order.final_price,
      id,
    ]);

    const deleteOrderDetailsQuery =
      "DELETE FROM order_details WHERE order_id = ?";
    await pool.query(deleteOrderDetailsQuery, [id]);

    const insertOrderDetailsQuery =
      "INSERT INTO order_details (order_id, product_id, qty, unit_price, total_price) VALUES (?, ?, ?, ?, ?)";
    for (const detail of orderDetails) {
      //current unit price of the product
      const [rows] = await pool.query(
        "SELECT unit_price FROM products WHERE id = ?",
        [detail.product_id]
      );
      const unit_price = rows[0].unit_price;

      await pool.query(insertOrderDetailsQuery, [
        id,
        detail.product_id,
        detail.qty,
        unit_price,
        detail.total_price,
      ]);
    }

    await pool.query("COMMIT");
  } catch (error) {
    await pool.query("ROLLBACK");
    throw new Error(error);
  }
};

const deleteOrder = async ({ id }) => {
  await pool.query("DELETE FROM order_details WHERE order_id = ?", [id]);
  await pool.query("DELETE FROM orders WHERE id = ?", [id]);
};

const updateOrderDetails = async ({ id, order: payload }) => {
  try {
    const { order, orderDetails } = payload;
    await pool.query("START TRANSACTION");

    const deleteOrderDetailsQuery =
      "DELETE FROM order_details WHERE order_id = ?";
    await pool.query(deleteOrderDetailsQuery, [id]);

    const insertOrderDetailsQuery =
      "INSERT INTO order_details (order_id, product_id, unit_price, qty, total_price) VALUES (?, ?, ?, ?, ?)";
    for (const detail of orderDetails) {
      //unit price of the product
      const [rows] = await pool.query(
        "SELECT unit_price FROM products WHERE id = ?",
        [detail.product_id]
      );
      const unit_price = rows[0].unit_price;

      await pool.query(insertOrderDetailsQuery, [
        id,
        detail.product_id,
        unit_price,
        detail.qty,
        detail.total_price,
      ]);
    }

    await pool.query("COMMIT");
    return { success: true, message: "Order details updated successfully" };
  } catch (error) {
    await pool.query("ROLLBACK");
    throw new Error(error.message ?? "Error updating the order");
  }
};

const addOrderDetails = async ({ orderId, orderDetails }) => {
  try {
    await pool.query("START TRANSACTION");

    const insertOrderDetailsQuery =
      "INSERT INTO order_details (order_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)";
    for (const detail of orderDetails) {
      await pool.query(insertOrderDetailsQuery, [
        orderId,
        detail.product_id,
        detail.quantity,
        detail.total_price,
      ]);
    }

    await pool.query("COMMIT");
    return { success: true, message: "New order details added successfully" };
  } catch (error) {
    await pool.query("ROLLBACK");
    throw new Error(error.message ?? "Error adding new order");
  }
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
