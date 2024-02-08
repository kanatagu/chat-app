import { useState, useCallback } from 'react';
import { UserType } from '../../types';
import { getUserApi } from '../../api/user';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const getUser = useCallback(async () => {
    const res = await getUserApi();
    setCurrentUser(res.data);
  }, []);

  return { currentUser, getUser, setCurrentUser };
};
