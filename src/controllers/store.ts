import { Request, Response, NextFunction } from "express";
import { Store } from "../models";
import { NotFoundError } from "../errors/not-found-error";

/**
 * Retrieves all stores from the database and sends them in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing all stores.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const getStores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const query = req.query as { [key: string]: string };

    // // validate page and limit
    // const page = isNaN(Number(query.page))
    //   ? DEFAULT_PAGE
    //   : Math.max(1, Number(query.page));
    // const limit = isNaN(Number(query.limit))
    //   ? DEFAULT_LIMIT
    //   : Math.max(1, Number(query.limit));

    const stores = await Store.findAll({
      include: [
        {
          association: Store.associations.address,
          attributes: ["address", "address2", "district"],
        },
      ],
    });
    res.status(200).json(stores);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Retrieves a store by ID from the database and sends it in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the store.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const getStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [
        {
          association: Store.associations.address,
          attributes: ["address", "address2", "district"],
        },
      ],
    });

    if (!store) {
      throw new NotFoundError("Store not found");
    }

    res.status(200).json(store);
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new store in the database and sends it in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the new store.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const createStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const store = await Store.create(req.body);

    res.status(201).json(store);
  } catch (error) {
    next(error);
  }
};

/**
 * Updates a store in the database and sends it in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the updated store.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const updateStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const store = await Store.findByPk(req.params.id);

    if (!store) {
      throw new NotFoundError("Store not found");
    }

    await store.update(req.body);

    res.status(200).json(store);
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a store by ID from the database and sends a success response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A success response.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const deleteStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const store = await Store.findByPk(req.params.id);

    if (!store) {
      throw new NotFoundError("Store not found");
    }

    await store.destroy();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
