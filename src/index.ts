import "dotenv/config";
import express from "express";
import path from "path";
import morgan from "morgan";
import pkg from "../package.json";

// Create a new express application instance
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
  app.use(morgan("dev"));
}
// app.use((req, res, next) => {
//   if (process.env.NODE_ENV === "development") morgan("dev");
//   next();
// });

// api route
app.get("/api", (req, res, next) => {
  res.status(200).json({
    version: pkg.version,
    message: "DvdRental API",
  });
});

// Define a route handler for the default home page

// The port the express app will listen on
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
