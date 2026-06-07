import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useAuth } from '../../context/authContext';
import { 
  getCartByUser, 
  increaseItemQuantity, 
  decreaseItemQuantity, 
  removeItem, 
  CartItem 
} from '../../sqlite';

import {
  Container,
  EmptyContainer,
  EmptyIcon,
  EmptyText,
  Card,
  ProductImage,
  InfoContainer,
  ProductName,
  ProductCategory,
  ProductPrice,
  ActionsContainer,
  RemoveButton,
  RemoveButtonText,
  QuantityControl,
  QuantityButton,
  QuantityButtonText,
  QuantityText,
  Footer,
  TotalContainer,
  TotalLabel,
  TotalValue,
  CheckoutButton,
  CheckoutButtonText
} from './styles';

export function Cart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigation = useNavigation<any>();

  const refreshCart = useCallback(() => {
    if (!user?.id) return;
    const data = getCartByUser(user.id);
    setCartItems([...data]);
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      refreshCart();
    }, [refreshCart])
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

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => `${item.productId}-${index}`}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyContainer>
            <EmptyIcon>🛒</EmptyIcon>
            <EmptyText>Seu carrinho está vazio</EmptyText>
          </EmptyContainer>
        )}
        renderItem={({ item }) => (
          <Card>
            <ProductImage source={{ uri: item.image }} />
            
            <InfoContainer>
              <ProductName>{item.name}</ProductName>
              <ProductCategory>{item.category}</ProductCategory>
              <ProductPrice>R$ {(item.price * item.quantity).toFixed(2)}</ProductPrice>
            </InfoContainer>

            <ActionsContainer>
              <RemoveButton onPress={() => handleRemove(item.productId)}>
                <RemoveButtonText>Remover</RemoveButtonText>
              </RemoveButton>

              <QuantityControl>
                <QuantityButton onPress={() => handleDecrease(item.productId)}>
                  <QuantityButtonText>-</QuantityButtonText>
                </QuantityButton>
                
                <QuantityText>{item.quantity}</QuantityText>
                
                <QuantityButton onPress={() => handleIncrease(item.productId)}>
                  <QuantityButtonText>+</QuantityButtonText>
                </QuantityButton>
              </QuantityControl>
            </ActionsContainer>
          </Card>
        )}
      />

      {cartItems.length > 0 && (
        <Footer>
          <TotalContainer>
            <TotalLabel>Total do Pedido</TotalLabel>
            <TotalValue>R$ {total.toFixed(2)}</TotalValue>
          </TotalContainer>

          <CheckoutButton onPress={() => navigation.navigate('checkout')}>
            <CheckoutButtonText>Avançar para o Checkout</CheckoutButtonText>
          </CheckoutButton>
        </Footer>
      )}
    </Container>
  );
}