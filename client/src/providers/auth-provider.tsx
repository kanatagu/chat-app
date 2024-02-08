import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useAuth } from '../hooks/auth';
import { UserType } from '../types';
import { Loading } from '../components/ui';

type AuthContextType = {
  currentUser: UserType | null;
  setCurrentUser: Dispatch<SetStateAction<UserType | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { currentUser, getUser, setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  console.log('currentUser', currentUser);

  useEffect(() => {
    setIsLoading(true);
    getUser().finally(() => setIsLoading(false));
  }, [getUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
