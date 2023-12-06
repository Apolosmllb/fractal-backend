import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import ordersRoutes from "./routes/orders.routes.js";
import productsRoutes from "./routes/products.routes.js";
//Inizialitations
const app = express();

//Settings
app.set("port", process.env.PORT || 5800);

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(json());

//Routes
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/products", productsRoutes);

//Run server
app.listen(app.get("port"), () => {
  console.log("🚀Server on port", app.get("port"));
});
