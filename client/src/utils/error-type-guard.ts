import axios, { AxiosError } from 'axios';

export const isErrorWithMessage = (
  error: unknown
): error is AxiosError<string> => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message !== undefined ||
      typeof error.response?.data === 'string'
    );
  }

  return false;
};
