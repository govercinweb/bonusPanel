export class RequestError extends Error {
  constructor(statusCode, message, originalError) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    if (originalError) console.error(originalError);
  }
}
