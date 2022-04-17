import { RequestError } from './request-error';

export class NotAuthorizedError extends RequestError {
  constructor(originalError) {
    super(401, 'Not authorized', originalError);
  }
}
