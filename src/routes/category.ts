import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category";
import { requestValidator } from "../middleware/request-validator";
import { body, param } from "express-validator";

const route = Router();

route.get("/", getCategories);
route.post(
  "/",
  [body("name").isString().notEmpty()],
  requestValidator,
  createCategory
);

route.put(
  "/:categoryId",
  [param("categoryId").isInt().notEmpty(), body("name").isString().notEmpty()],
  requestValidator,
  updateCategory
);

route.delete(
  "/:categoryId",
  [param("categoryId").isInt().notEmpty()],
  requestValidator,
  deleteCategory
);

export { route as categoryRouter };
