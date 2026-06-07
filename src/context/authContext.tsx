import { createContext, useContext, useState } from 'react';
import { addProductToCart } from '../sqlite';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

type AuthUser = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

type AuthContextData = {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  logout: () => void;
  addToCart: (product: Product) => Promise<void>;
};

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<AuthUser | null>(null);

  function signIn(userData: AuthUser) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
  }

  async function addToCart(product: Product) {
    if (!user?.id) return;

    await addProductToCart({
      userId: user.id,
      productId: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
      price: product.price,
      quantity: 1,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        logout,
        addToCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
