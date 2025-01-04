import { Request, Response, NextFunction } from "express";
import { Address } from "../models";

/**
 * Retrieves all addresses from the database and sends them in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing all addresses.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const getAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const addresses = await Address.findAll();
    res.status(200).json(addresses);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a single address from the database and sends it in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the address.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const getAddressById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
/**
 * Creates a new address in the database and sends it in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the new address.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const createAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
/**
 * Updates an address in the database and sends it in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the updated address.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

/**
 * Deletes an address from the database.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response indicating that the address was deleted.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const deleteAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
