import axios, { AxiosError } from 'axios';

export const isErrorWithMessage = (
  error: unknown
): error is AxiosError<{ message: string }> => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message !== undefined &&
      typeof error.response?.data.message === 'string'
    );
  }

  return false;
};
