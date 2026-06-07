import { createContext, useContext } from 'react';
import { addProductToCart } from '../sqlite';
import { useAuth } from './authContext';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

type CartContextData = {
  addToCart: (product: Product) => void;
};

const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  function addToCart(product: Product) {
    if (!user?.id) {
      console.log('User not logged');
      return;
    }

    addProductToCart({
      userId: user.id,
      productId: String(product.id),
      name: product.name,
      price: product.price,
      quantity: 1,
      category: product.category,
      image: product.image,
    });
  }

  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
