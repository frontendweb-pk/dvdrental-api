import { Router } from "express";
import {
  createCity,
  deleteCity,
  getAllCity,
  updateCity,
} from "../controllers/city";

const route = Router();

route.get("/", getAllCity);
route.post("/", createCity);
route.put("/:cityId", updateCity);
route.delete("/:cityId", deleteCity);
export { route as cityRoute };
