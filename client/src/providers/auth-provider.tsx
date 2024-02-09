import { useEffect } from 'react';
import { useAuthStore, useFriendlyForwardingStore } from '../store';
import { Loading } from '../components/ui';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const getUser = useAuthStore((state) => state.getUser);
  const isGettingUser = useAuthStore((state) => state.isGettingUser);
  const setRedirectTo = useFriendlyForwardingStore(
    (state) => state.setRedirectTo
  );

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname === '/') {
      setRedirectTo('/');
    } else {
      setRedirectTo(pathname);
    }
  }, [setRedirectTo]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isGettingUser) {
    return <Loading />;
  }

  return <>{children}</>;
};
