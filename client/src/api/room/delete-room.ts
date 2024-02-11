import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { RoomType } from '../../types';

type DeleteRoomApiArg = {
  roomId: number;
};

export const deleteRoomApi = async ({
  roomId,
}: DeleteRoomApiArg): Promise<AxiosResponse<RoomType>> => {
  const res = await baseServer.delete(`/rooms/${roomId}`);
  return res;
};
