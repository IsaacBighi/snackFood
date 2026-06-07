import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';

import { CartProductCard } from '../../components/cartProductCard';
import { useAuth } from '../../context/authContext';

import {
  type CartItem,
  decreaseItemQuantity,
  getCartByUser,
  increaseItemQuantity,
  removeItem,
} from '../../sqlite';

import { Container, EmptyText, Footer, TotalText } from './styles';

export function Cart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const refreshCart = useCallback(() => {
    if (!user?.id) return;
    const data = getCartByUser(user.id);
    setCartItems([...data]);
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      refreshCart();
    }, [refreshCart]),
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function handleIncrease(productId: string) {
    if (!user?.id) return;
    increaseItemQuantity(user.id, productId);
    refreshCart();
  }

  function handleDecrease(productId: string) {
    if (!user?.id) return;
    decreaseItemQuantity(user.id, productId);
    refreshCart();
  }

  function handleRemove(productId: string) {
    if (!user?.id) return;
    removeItem(user.id, productId);
    refreshCart();
  }

  return (
    <Container>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => `${item.productId}-${index}`}
        ListEmptyComponent={<EmptyText>Carrinho vazio</EmptyText>}
        renderItem={({ item }) => (
          <CartProductCard
            name={item.name}
            category={item.category}
            price={item.price}
            image={item.image}
            quantity={item.quantity}
            onIncrease={() => handleIncrease(item.productId)}
            onDecrease={() => handleDecrease(item.productId)}
            onRemove={() => handleRemove(item.productId)}
          />
        )}
        ListFooterComponent={
          cartItems.length > 0 ? (
            <Footer>
              <TotalText>Total: R$ {total.toFixed(2)}</TotalText>
            </Footer>
          ) : null
        }
      />
    </Container>
  );
}
