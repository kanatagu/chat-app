import { useContext } from 'react';
import { AuthContext } from './auth-provider';

export function useAuthContext() {
  return useContext(AuthContext);
}
