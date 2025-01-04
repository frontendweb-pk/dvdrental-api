import { Router } from "express";
import {
  createAddress,
  deleteAddress,
  getAddressById,
  getAddresses,
  updateAddress,
} from "../controllers/address";

const route = Router();

route.get("/", getAddresses);
route.get("/:id", getAddressById);
route.post("/", createAddress);
route.put("/:id", updateAddress);
route.delete("/:id", deleteAddress);

export { route as addressRoute };
