import { Request, Response, NextFunction } from "express";
import { Actor } from "../models/actor";
import { Op } from "sequelize";

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
export const getActors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as { [key: string]: string };
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 10;
    const sort = query.sort || "actor_id";
    const order = query.order || "ASC";
    const search = query.search || "";

    const actors = await Actor.findAll({
      where: { first_name: { [Op.iLike]: `%${search}%` } },
      limit: limit,
      order: [[sort, order]],
      offset: search ? 0 : (page - 1) * limit,
      attributes: ["actor_id", "first_name", "last_name", "last_update"],
    });
    res.status(200).json(actors);
  } catch (error) {
    next(error);
  }
};

export const getActor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

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
