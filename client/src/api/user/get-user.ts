import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { UserType } from '../../types';

export const getUserApi: () => Promise<AxiosResponse<UserType>> = async () => {
  const res = await baseServer.get('/user');
  return res;
};
