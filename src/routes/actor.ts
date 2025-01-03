import { Router } from "express";
import { getActor, getActors } from "../controllers/actor";

const route = Router();

route.get("/", getActors);
route.get("/:id", getActor);

export { route as actorRoute };
