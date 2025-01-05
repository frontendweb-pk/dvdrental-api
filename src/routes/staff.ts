import { Router } from "express";

import {
  changePassword,
  getAllStaff,
  //   getStaffById,
  //   createStaff,
  //   updateStaff,
  //   deleteStaff,
} from "../controllers/staff";
import { registerStaff, staffLogin } from "../controllers/auth";
import { body } from "express-validator";
import { requestValidator } from "../middleware/request-validator";

const route = Router();

route.post("/login", staffLogin);
route.post(
  "/register",
  [
    body("username").isString().notEmpty(),
    body("password").isString().notEmpty(),
    body("first_name").isString().notEmpty(),
    body("last_name").isString().notEmpty(),
    body("email").isEmail(),
    body("store_id").isInt(),
    body("address_id").isInt(),
  ],
  requestValidator,
  registerStaff
);

route.get("/", getAllStaff);
// route.get("/:id", getStaffById);
// route.post("/", createStaff);
// route.put("/:id", updateStaff);
// route.delete("/:id", deleteStaff);
route.put("/:staffId", changePassword);

export { route as staffRoute };
