import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { RoomDetailsType } from '../../types';

type GetRoomDetailsArg = {
  roomId: number;
};

export const getRoomDetailsApi = async ({
  roomId,
}: GetRoomDetailsArg): Promise<AxiosResponse<RoomDetailsType>> => {
  const res = await baseServer.get(`/rooms/${roomId}`);
  return res;
};
