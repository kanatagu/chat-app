import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { UserType } from '../../types/user';

type RegisterArg = {
  username: string;
  password: string;
};

export const registerApi = async ({
  username,
  password,
}: RegisterArg): Promise<AxiosResponse<UserType>> => {
  const res = await baseServer.post('/auth/register', { username, password });
  return res;
};
