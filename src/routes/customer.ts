import { Router } from "express";
import {
  addCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer";
import { requestValidator } from "../middleware/request-validator";
import { body } from "express-validator";

const route = Router();

route.get("/", getCustomers);
route.post(
  "/",
  [
    body("first_name").isString().notEmpty(),
    body("last_name").isString().notEmpty(),
    body("email").isEmail().withMessage("Invalid mail"),
  ],
  requestValidator,
  addCustomer
);
route.put(
  "/:customerId",
  [
    body("first_name").isString().notEmpty(),
    body("last_name").isString().notEmpty(),
  ],
  requestValidator,
  updateCustomer
);
route.delete("/:customerId", deleteCustomer);

export { route as customerRouter };
