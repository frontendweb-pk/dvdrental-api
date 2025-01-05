import "dotenv/config";
import express from "express";
import path from "path";
import morgan from "morgan";
import pkg from "../package.json";
import { sequelize } from "./models";
import { actorRoute } from "./routes/actor";
import { errorHandler } from "./middleware/error-handler";
import { filmRoute } from "./routes/film";
import { storeRoute } from "./routes/store";
import { addressRoute } from "./routes/address";
import { staffRoute } from "./routes/staff";
import { categoryRouter } from "./routes/category";
import { cityRoute } from "./routes/city";
import { customerRouter } from "./routes/customer";

// Create a new express application instance
const app = express();
const port = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// api
app.get("/api", (req, res, next) => {
  res.status(200).json({
    version: pkg.version,
    message: "DvdRental API",
  });
});
app.use("/api/v1/actor", actorRoute);
app.use("/api/v1/film", filmRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/staff", staffRoute);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/city", cityRoute);
app.use("/api/v1/customer", customerRouter);

app.use(errorHandler);

// The port the express app will listen on
(async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
  });
})();
