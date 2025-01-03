export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";
  statusCode = 500;
  constructor() {
    super("Error connecting to database");
    this.reason = "Error connecting to database";
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason, statusCode: this.statusCode }];
  }
}
