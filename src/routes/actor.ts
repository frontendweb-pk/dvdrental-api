import { Router } from "express";
import { getActors } from "../controllers/actor";

const route = Router();

route.get("/", getActors);

export { route as actorRoute };
