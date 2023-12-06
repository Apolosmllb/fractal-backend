import pool from "../../database.js";

const getProducts = async () => {
  const [result] = await pool.query("SELECT * FROM products");
  return result;
};

export default {
  getProducts,
};
