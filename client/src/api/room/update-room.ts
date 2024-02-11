import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { RoomType } from '../../types';

type UpdateRoomApiArg = {
  roomId: number;
  name: string;
  description: string | null;
};

export const updateRoomApi = async ({
  roomId,
  name,
  description,
}: UpdateRoomApiArg): Promise<AxiosResponse<RoomType>> => {
  const res = await baseServer.put(`/rooms/${roomId}`, {
    name,
    description,
  });
  return res;
};
