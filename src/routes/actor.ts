/**
 * @file actor.ts
 * @fileoverview This file sets up the routes for the actor resource in the dvdrental API.
 * It includes routes for creating, retrieving, updating, and deleting actor records.
 *
 * @module routes/actor
 */
import { Router } from "express";
import {
  createActor,
  deleteActor,
  getActor,
  getActors,
  updateActor,
} from "../controllers/actor";
import { body, param } from "express-validator";

/**
 * Initializes the actor route.
 *
 * This route handles all the endpoints related to the actor resource.
 *
 * @constant
 * @type {Router}
 */
const route = Router();

/**
 * GET /actors
 *
 * @summary Retrieves a list of all actors.
 * @function
 * @name getActors
 * @memberof module:routes/actor
 * @inner
 * @returns {Array<Object>} 200 - An array of actor objects.
 */
route.get("/", getActors);
/**
 * GET /actors/:id
 *
 * @summary Retrieves a single actor by ID.
 * @function
 * @name getActor
 * @memberof module:routes/actor
 * @inner
 * @param {string} id - The ID of the actor to retrieve.
 * @returns {Object} 200 - An actor object.
 */

route.get("/:id", getActor);
/**
 * POST /actors
 *
 * @summary Creates a new actor.
 * @function
 * @name createActor
 * @memberof module:routes/actor
 * @inner
 * @param {string} first_name - The first name of the actor.
 * @param {string} last_name - The last name of the actor.
 * @returns {Object} 201 - The created actor object.
 */
route.post(
  "/",
  [
    body("first_name").isString().notEmpty(),
    body("last_name").isString().notEmpty(),
  ],
  createActor
);

/**
 * PUT /actors/:id
 *
 * @summary Updates an existing actor by ID.
 * @function
 * @name updateActor
 * @memberof module:routes/actor
 * @inner
 * @param {string} id - The ID of the actor to update.
 * @param {string} first_name - The new first name of the actor.
 * @param {string} last_name - The new last name of the actor.
 * @returns {Object} 200 - The updated actor object.
 */
route.put(
  "/:id",
  [
    param("id").isNumeric().notEmpty(),
    body("first_name").isString().notEmpty(),
    body("last_name").isString().notEmpty(),
  ],
  updateActor
);

/**
 * DELETE /actors/:id
 *
 * @summary Deletes an actor by ID.
 * @function
 * @name deleteActor
 * @memberof module:routes/actor
 * @inner
 * @param {string} id - The ID of the actor to delete.
 * @returns {Object} 200 - A message indicating the actor was deleted.
 */
route.delete("/:id", [param("id").isNumeric().notEmpty()], deleteActor);

export { route as actorRoute };
