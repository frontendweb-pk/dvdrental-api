import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  statusCode = 400;
  constructor(
    public errors: ValidationError[],
    message?: string,
    public field?: string
  ) {
    super(message);
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.type,
        statusCode: this.statusCode,
      };
    });
  }
}
