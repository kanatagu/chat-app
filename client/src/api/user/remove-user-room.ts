import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { RoomType } from '../../types';

type RemoveUserRoomApiArg = {
  roomId: number;
};

export const removeUserRoomApi = async ({
  roomId,
}: RemoveUserRoomApiArg): Promise<AxiosResponse<RoomType>> => {
  const res = await baseServer.post(`/user/rooms/${roomId}/remove`);
  return res;
};
