import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors";
import { Request, Response, NextFunction } from "express";

export const requestValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const array = validationResult(req);
  if (!array.isEmpty()) {
    throw new RequestValidationError(array.array());
  }
};
