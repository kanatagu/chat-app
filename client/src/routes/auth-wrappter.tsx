import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Loading } from '../components/ui';
import { PUBLIC_PATH } from '../const';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const getUser = useAuthStore((state) => state.getUser);
  const currentUser = useAuthStore((state) => state.currentUser);
  const isGettingUser = useAuthStore((state) => state.isGettingUser);

  const pathname = window.location.pathname;

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    // if user does not login
    if (!isGettingUser && !currentUser) {
      navigate('/login');
    }

    // // if user does login and access auth pages
    if (currentUser && PUBLIC_PATH.includes(pathname)) {
      navigate('/');
    }
  }, [currentUser, navigate, isGettingUser, pathname]);

  if ((isGettingUser || !currentUser) && !PUBLIC_PATH.includes(pathname)) {
    return <Loading />;
  }

  return <>{children}</>;
};
