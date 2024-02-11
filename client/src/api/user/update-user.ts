import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { UserType } from '../../types';

type UpdateUserArg = {
  username: string;
  image_icon: string | null;
};

export const updateUserApi = async ({
  username,
  image_icon,
}: UpdateUserArg): Promise<AxiosResponse<UserType>> => {
  const res = await baseServer.put('/user', { username, image_icon });
  return res;
};
