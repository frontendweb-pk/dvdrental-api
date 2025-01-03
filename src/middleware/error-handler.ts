import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error instanceof Error) {
    res.status(error.statusCode).json({
      errors: error.serializeErrors(),
    });
    return;
  }
  res.status(500).json({
    message: "Internal server error",
  });
};
