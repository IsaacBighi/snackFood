import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { checkEmailExists, createUser, loginUser, type User } from '../sqlite';

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const loggedUser = loginUser(email, password);
      if (loggedUser) {
        setUser(loggedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const emailExists = checkEmailExists(email);
      if (emailExists) {
        return { success: false, message: 'Este e-mail já está cadastrado.' };
      }

      createUser({ name, email, password });
      return { success: true };
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      return { success: false, message: 'Erro interno ao salvar dados.' };
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
