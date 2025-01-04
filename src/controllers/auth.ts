import exp from "constants";
import { AuthError } from "../errors/auth-error";
import { NotFoundError } from "../errors/not-found-error";
import { Jwt } from "../lib/jwt";
import { Password } from "../lib/password";
import { Staff } from "../models";

import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";

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

    const today = new Date(Date.now());
    today.setHours(today.getHours() + 1);
    console.log(today);

    const token = Jwt.token(
      {
        staff_id: staff.staff_id,
        username: staff.username,
        email: staff.email,
      },
      {
        expiresIn: today.getMilliseconds(),
      }
    );

    let { password: p, ...restStaff } = staff.toJSON();
    res.status(200).json({
      accessToken: token,
      expiresIn: today,
      staff: restStaff,
    });
  } catch (error) {
    next(error);
  }
};
