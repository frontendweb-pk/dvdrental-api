import { Request, Response, NextFunction } from "express";
import { City, sequelize } from "../models";
import { Op } from "sequelize";
import { NotFoundError } from "../errors";

/**
 * Retrieve all cities
 * @param req
 * @param res
 * @param next
 */
export const getAllCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as { [key: string]: string };
    const countryId = isNaN(Number(query.countryId))
      ? null
      : Math.max(1, Number(query.countryId));

    // Sorting: Ensure the column is allowed for sorting
    const sort = query.sort ? query.sort : "city_id";
    const order = query.order === "DESC" ? "DESC" : "ASC";

    const where = countryId ? { country_id: { [Op.eq]: countryId } } : {};
    const cities = await City.findAll({
      where,
      order: [[sort, order]],
    });
    res.status(200).json(cities);
  } catch (error) {
    next(error);
  }
};

/**
 * Add new city
 * @param req
 * @param res
 * @param next
 */
export const createCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json(city);
  } catch (error) {
    next(error);
  }
};
export const updateCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const city = await City.findByPk(req.params.cityId);
    if (!city) throw new NotFoundError("City not found");

    const result = await city.update(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete city
 * @param req
 * @param res
 * @param next
 */
export const deleteCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const city = await City.findByPk(req.params.cityId);
    if (!city) throw new NotFoundError("City not found");

    await city.destroy();

    res.status(200).json({ city_id: city.city_id });
  } catch (error) {
    next(error);
  }
};
