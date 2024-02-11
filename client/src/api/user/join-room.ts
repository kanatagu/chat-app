import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { RoomType } from '../../types';

type JoinRoomApiArg = {
  roomId: number;
};

export const joinRoomApi = async ({
  roomId,
}: JoinRoomApiArg): Promise<AxiosResponse<RoomType>> => {
  const res = await baseServer.post(`/user/rooms/${roomId}/join`);
  return res;
};
