import { Request, Response, NextFunction } from "express";
import { Film } from "../models/film";
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from "../lib";
import { Op } from "sequelize";
import { NotFoundError } from "../errors/not-found-error";
import { Language } from "../models/language";

const ALLOWED_SORT_COLUMNS = [
  "film_id",
  "title",
  "description",
  "release_year",
  "language_id",
  "rental_duration",
  "rental_rate",
  "length",
  "replacement_cost",
  "rating",
  "last_update",
  "special_features",
  "fulltext",
];

/**
 * Retrieves all films from the database and sends them in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the list of films.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const getFilms = async (
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
      : "film_id";
    const order = query.order === "DESC" ? "DESC" : "ASC";

    // Search: Ensure search string is sanitized (we use iLike for case-insensitive matching)
    const search = query.search || "";

    // Prepare query conditions
    const where: any = search ? { title: { [Op.iLike]: `%${search}%` } } : {};

    // Retrieve all films from the database
    const films = await Film.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [[sort, order]],
      attributes: ALLOWED_SORT_COLUMNS,
      include: [
        {
          association: Film.associations.language,
          attributes: ["name"],
        },
        {
          association: Film.associations.actors,
          attributes: ["first_name", "last_name"],
          through: { attributes: [] },
        },
      ],
    });

    // Return the total number of films
    const totalFilms = await Film.count({ where });

    res.status(200).json({
      data: films,
      pagination: {
        total: totalFilms,
        page,
        limit,
        totalPages: Math.ceil(totalFilms / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a film by ID from the database and sends it in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the film.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const getFilmById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const film = await Film.findByPk(req.params.id);

    if (!film) {
      throw new NotFoundError("Film not found");
    }

    res.status(200).json(film);
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new film in the database and sends it in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the created film.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const createFilm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const film = await Film.create(req.body);
    res.status(201).json(film);
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing film by ID in the database and sends it in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the updated film.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const updateFilm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filmId = req.params.id;
    const film = await Film.findByPk(filmId);

    if (!film) {
      throw new NotFoundError("Film not found");
    }

    await film.update(req.body);

    res.status(200).json(film);
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a film by ID from the database and sends a message in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing a message indicating the film was deleted.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const deleteFilm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filmId = req.params.id;
    const film = await Film.findByPk(filmId);

    if (!film) {
      throw new NotFoundError("Film not found");
    }

    await film.destroy();

    res.status(200).json({ film_id: filmId, message: "Film deleted" });
  } catch (error) {
    next(error);
  }
};
