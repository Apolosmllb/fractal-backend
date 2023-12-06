import { Router } from "express";
import productsController from "../products/controller/index.js";

const router = Router();

router.get("/", productsController.getProducts);

export default router;
