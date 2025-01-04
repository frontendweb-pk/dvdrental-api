import { Router } from "express";
import {
  createStore,
  deleteStore,
  getStoreById,
  getStores,
  updateStore,
} from "../controllers/store";

const route = Router();

route.get("/", getStores);
route.get("/:id", getStoreById);
route.post("/", createStore);
route.put("/:id", updateStore);
route.delete("/:id", deleteStore);

export { route as storeRoute };
