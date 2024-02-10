import { AxiosResponse } from 'axios';
import baseServer from '../base';
import { MessageType } from '../../types';

export const getMessagesApi: (
  roomId: string
) => Promise<AxiosResponse<MessageType[]>> = async (roomId) => {
  const res = await baseServer.get(`/messages?roomId=${roomId}`);
  return res;
};
