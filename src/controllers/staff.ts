import { NotFoundError } from "../errors/not-found-error";
import { Staff } from "../models";
import { Request, Response, NextFunction } from "express";

/**
 * Retrieves all staff from the database and sends them in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing all staff.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const getAllStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const staff = await Staff.findAll({
      include: [
        {
          association: Staff.associations.address,
          attributes: ["address", "address2", "district"],
        },
        {
          association: Staff.associations.store,
          attributes: ["store_id"],
        },
      ],
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(staff);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a staff member by their ID and sends them in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the staff member.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const createStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a staff member by their ID and sends them in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the staff member.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const getStaffById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const staff = await Staff.findByPk(req.params.id, {
      include: [
        {
          association: Staff.associations.address,
          attributes: ["address", "address2", "district"],
        },
        {
          association: Staff.associations.store,
          attributes: ["store_id"],
        },
      ],
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(staff);
  } catch (error) {
    next(error);
  }
};

/**
 * Updates a staff member by their ID and sends them in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the staff member.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const updateStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    await staff.update(req.body);
    res.status(200).json(staff);
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a staff member by their ID and sends a success message in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A success message.
 *
 * @throws Passes any errors to the next middleware function.
 */

export const deleteStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    await staff.destroy();
    res.status(200).json({ message: "Staff member deleted" });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a staff member by their ID and sends them in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the staff member.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const staff = await Staff.findByPk(req.params.staffId);
    console.log(staff);
    if (!staff) {
      throw new NotFoundError("Staff member not found");
    }

    await staff.update({ password: req.body.password });
    res.status(200).json(staff);
  } catch (error) {
    next(error);
  }
};
