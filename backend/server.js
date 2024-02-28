import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import userProduct from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// Body parser middleware
// Raw json:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userProduct);
app.use("/api/orders", orderRoutes);
app.use("/api/upload/", uploadRoutes);

app.use("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV) {
  // set static folder:
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // any route that is not api will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${port}`)
);
