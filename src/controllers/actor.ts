import { Request, Response, NextFunction } from "express";
import { Actor } from "../models/actor";
import { Op } from "sequelize";
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from "../lib";
import { NotFoundError } from "../errors/not-found-error";

/**
 * Retrieves all actors from the database and sends them in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the list of actors.
 *
 * @throws Passes any errors to the next middleware function.
 */

const ALLOWED_SORT_COLUMNS = [
  "actor_id",
  "first_name",
  "last_name",
  "last_update",
];

export const getActors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as { [key: string]: string };

    // Pagination: Validate 'page' and 'limit'
    const page = isNaN(Number(query.page))
      ? DEFAULT_PAGE
      : Math.max(1, parseInt(query.page));

    const limit = isNaN(Number(query.limit))
      ? DEFAULT_LIMIT
      : Math.min(MAX_LIMIT, parseInt(query.limit));

    // Sorting: Ensure the column is allowed for sorting
    const sort = ALLOWED_SORT_COLUMNS.includes(query.sort || "")
      ? query.sort
      : "actor_id";
    const order = query.order === "DESC" ? "DESC" : "ASC";

    // Search: Ensure search string is sanitized (we use iLike for case-insensitive matching)
    const search = query.search || "";

    // Prepare query conditions
    const where: any = search
      ? { first_name: { [Op.iLike]: `%${search}%` } }
      : {};

    const actors = await Actor.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [[sort, order]],
      attributes: ALLOWED_SORT_COLUMNS,
    });

    // Get total count for pagination info (optional)
    const totalActors = await Actor.count({ where });

    res.status(200).json({
      data: actors,
      pagination: {
        total: totalActors,
        page,
        limit,
        totalPages: Math.ceil(totalActors / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a single actor from the database and sends it in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the actor.
 *
 * @throws Passes any errors to the next middleware function.
 */

export const getActor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const actorId = req.params.id;
    const actor = await Actor.findByPk(actorId);

    if (!actor) {
      throw new NotFoundError("Actor not found");
    }

    res.status(200).json(actor);
  } catch (error) {
    next(error);
  }
};

export const createActor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const updateActor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const deleteActor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
