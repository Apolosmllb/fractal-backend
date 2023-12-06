import productsService from "../../products/service/index.js";

const getProducts = async (_, res) => {
  try {
    const result = await productsService.getProducts();
    return res.status(200).json({
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getProducts,
};
