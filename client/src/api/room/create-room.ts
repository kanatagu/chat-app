import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { RoomType } from '../../types';

type CreateRoomApiArg = {
  userId: number;
  name: string;
  description: string | null;
};

export const createRoomApi = async ({
  userId,
  name,
  description,
}: CreateRoomApiArg): Promise<AxiosResponse<RoomType>> => {
  const res = await baseServer.post('/rooms', { userId, name, description });
  return res;
};
