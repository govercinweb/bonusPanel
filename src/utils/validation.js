import { RequestError } from '../error/request-error';

export const validateFields = (fields) => {
  const missingFields = Object.keys(fields).filter((key) => !fields[key]);

  if (missingFields.length > 0)
    throw new RequestError(400, { 'Missing field(s)': missingFields });
};
