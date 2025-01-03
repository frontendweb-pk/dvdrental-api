export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string, public field?: string) {
    super(message);
    console.log("CustomError", this.constructor.prototype);
    Object.setPrototypeOf(this, this.constructor.prototype);
  }

  abstract serializeErrors(): IError[];
}

export interface IError {
  message: string;
  statusCode: number;
  field?: string;
}
