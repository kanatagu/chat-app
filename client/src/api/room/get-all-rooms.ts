import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { RoomType } from '../../types';

export const getAllRoomsApi: () => Promise<
  AxiosResponse<RoomType[]>
> = async () => {
  const res = await baseServer.get('/rooms');
  return res;
};
