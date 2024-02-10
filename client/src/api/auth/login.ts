import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { UserType } from '../../types';

type LoginApiArg = {
  username: string;
  password: string;
};

export const loginApi = async ({
  username,
  password,
}: LoginApiArg): Promise<AxiosResponse<UserType>> => {
  const res = await baseServer.post('/auth/login', { username, password });
  return res;
};
