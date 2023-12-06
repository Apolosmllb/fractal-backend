import productsRepository from "../repository/index.js";

const getProducts = async () => {
  return await productsRepository.getProducts();
};

export default {
  getProducts,
};
