export class BadRequestError extends Error {
  statusCode = 400;
  constructor(message: string, public field?: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.message, statusCode: this.statusCode, field: this.field },
    ];
  }
}
