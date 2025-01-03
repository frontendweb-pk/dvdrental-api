export class ServerError extends Error {
  statusCode = 500;
  constructor(message: string, public field?: string) {
    super(message);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
  serializeErrors() {
    return [
      { message: this.message, statusCode: this.statusCode, field: this.field },
    ];
  }
}
