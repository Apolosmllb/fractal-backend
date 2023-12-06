import { Router } from "express";
import ordersController from "../orders/controller/index.js";

const router = Router();

router.get("/", ordersController.getOrders);
router.get("/:id", ordersController.getOrderById);
router.get("/details/:id", ordersController.getOrderDetailsById);
router.post("/", ordersController.addOrder);
router.put("/:id", ordersController.updateOrder);
router.delete("/:id", ordersController.deleteOrder);

export default router;
