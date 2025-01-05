import exp from "constants";
import { AuthError } from "../errors/auth-error";
import { NotFoundError } from "../errors/not-found-error";
import { Jwt } from "../lib/jwt";
import { Password } from "../lib/password";
import { Staff } from "../models";

import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";

/**
 * Authenticates a staff member and sends a JWT token in the response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A JSON response containing the JWT token.
 *
 * @throws Passes any errors to the next middleware function.
 */
export const staffLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const staff = await Staff.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
      },
    });

    if (!staff) {
      throw new NotFoundError("Staff not found");
    }
    const vefify = Password.compare(password, staff.password);
    if (!vefify) {
      throw new AuthError("Invalid password");
    }

    const expiresIn = 3600;

    const token = Jwt.token(
      {
        staff_id: staff.staff_id,
        username: staff.username,
        email: staff.email,
      },
      {
        expiresIn,
      }
    );

    let { password: p, ...restStaff } = staff.toJSON();
    res.status(200).json({
      accessToken: token,
      expiresIn,
      staff: restStaff,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Registers a new staff member.
 *
 * This function handles the HTTP POST request to create a new staff member
 * in the database. It expects the request body to contain the staff details.
 * If the staff member is successfully created, it responds with a status code
 * of 201 and the created staff member's data in JSON format. If an error occurs,
 * it passes the error to the next middleware for handling.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function in the stack.
 * @returns A promise that resolves to void.
 */
export const registerStaff = async (
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
