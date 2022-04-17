import { RequestError } from './request-error';

export class InvalidOperationError extends RequestError {
  constructor(originalError) {
    super(400, 'Invalid operation', originalError);
  }
}
