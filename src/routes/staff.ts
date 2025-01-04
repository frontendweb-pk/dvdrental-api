import { Router } from "express";

import {
  changePassword,
  getAllStaff,
  //   getStaffById,
  //   createStaff,
  //   updateStaff,
  //   deleteStaff,
} from "../controllers/staff";
import { staffLogin } from "../controllers/auth";

const route = Router();

route.post("/login", staffLogin);
route.get("/", getAllStaff);
// route.get("/:id", getStaffById);
// route.post("/", createStaff);
// route.put("/:id", updateStaff);
// route.delete("/:id", deleteStaff);
route.put("/:staffId", changePassword);

export { route as staffRoute };
