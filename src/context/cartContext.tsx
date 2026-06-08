import type React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  addProductToCart,
  type CartItem,
  decreaseItemQuantity,
  getCartByUser,
  increaseItemQuantity,
  removeItem,
} from '../sqlite';
import { useAuth } from './authContext';

interface Product {
  id: string | number;
  name: string;
  category: string;
  image?: string;
  price: number;
}

interface CartContextData {
  items: CartItem[];
  addItem: (product: Product) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  totalValue: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  const loadCartItems = useCallback(() => {
    if (user?.id) {
      const cartData = getCartByUser(user.id);
      setItems(cartData);
    } else {
      setItems([]);
    }
  }, [user]);

  useEffect(() => {
    loadCartItems();
  }, [loadCartItems]);

  const addItem = (product: Product) => {
    if (!user?.id) return;

    const newItem: CartItem = {
      userId: user.id,
      productId: String(product.id),
      name: product.name,
      category: product.category,
      image: product.image || '',
      price: product.price,
      quantity: 1,
    };

    addProductToCart(newItem);
    loadCartItems();
  };

  const increaseQuantity = (productId: string) => {
    if (!user?.id) return;
    increaseItemQuantity(user.id, productId);
    loadCartItems();
  };

  const decreaseQuantity = (productId: string) => {
    if (!user?.id) return;
    decreaseItemQuantity(user.id, productId);
    loadCartItems();
  };

  const clearCart = () => {
    if (!user?.id) return;

    const userId = user.id;

    items.forEach((item) => {
      removeItem(userId, item.productId);
    });

    loadCartItems();
  };

  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
