import "dotenv/config";
import express from "express";
import path from "path";
import morgan from "morgan";
import pkg from "../package.json";
import { sequelize } from "./models";
import { Actor } from "./models/actor";
import { actorRoute } from "./routes/actor";
import { errorHandler } from "./middleware/error-handler";
import { filmRoute } from "./routes/film";

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

app.use(errorHandler);

// The port the express app will listen on
(async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
  });
})();
