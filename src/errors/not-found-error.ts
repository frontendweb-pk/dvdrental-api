export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: string, public field?: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return [
      { message: this.message, statusCode: this.statusCode, field: this.field },
    ];
  }
}
