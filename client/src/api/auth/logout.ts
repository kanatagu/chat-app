import baseServer from '../base';

export const logoutApi = async () => {
  const res = await baseServer.get('/auth/logout');
  return res;
};
