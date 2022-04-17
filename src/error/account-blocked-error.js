import { RequestError } from './request-error';

export class AccountBlockedError extends RequestError {
  constructor(originalError) {
    super(
      401,
      'This account is blocked. Please contact your administrator.',
      originalError
    );
  }
}
