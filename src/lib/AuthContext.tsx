'use client';
import { User } from '@/models/User';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Context {
  user: User | undefined;
  loginUser: (user: User) => void;
}

export const AuthContext = createContext<Context>({
  user: undefined,
  loginUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (sessionStorage) setUser(localStorage.get('user'));
  }, []);

  const loginUser = (user: User) => {
    setUser(user);
    sessionStorage.setItem('user', user.email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
