import { Router } from "express";
import {
  createFilm,
  deleteFilm,
  getFilmById,
  getFilms,
  updateFilm,
} from "../controllers/film";
import { body } from "express-validator";

const route = Router();

route.get("/", getFilms);
route.get("/:id", getFilmById);
route.post(
  "/",
  [
    body("title").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("release_year").isInt().notEmpty(),
    body("language_id").isInt().notEmpty(),
    body("rental_duration").isInt().notEmpty(),
    body("rental_rate").isNumeric().notEmpty(),
    body("length").isInt().notEmpty(),
    body("replacement_cost").isNumeric().notEmpty(),
    body("rating").isString().notEmpty(),
  ],
  createFilm
);
route.put("/:id", updateFilm);
route.delete("/:id", deleteFilm);

export { route as filmRoute };
