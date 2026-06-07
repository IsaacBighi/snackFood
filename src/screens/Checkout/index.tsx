import { Alert, FlatList } from 'react-native';

import { useAuth } from '../../context/authContext';

import { getCartByUser } from '../../sqlite';

import {
  CheckoutButton,
  CheckoutButtonText,
  Container,
  ItemContainer,
  ItemName,
  ItemPrice,
  Title,
  TotalContainer,
  TotalText,
} from './styles';

export function Checkout() {
  const { user } = useAuth();

  if (!user?.id) {
    return (
      <Container>
        <Title>Usuário não encontrado</Title>
      </Container>
    );
  }

  const items = getCartByUser(user.id);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = 5;

  const total = subtotal + deliveryFee;

  function handleCheckout() {
    Alert.alert('Pedido realizado', 'Seu pedido foi enviado com sucesso!');
  }

  return (
    <Container>
      <Title>Checkout</Title>

      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <ItemContainer>
            <ItemName>
              {item.name} x{item.quantity}
            </ItemName>

            <ItemPrice>R$ {(item.price * item.quantity).toFixed(2)}</ItemPrice>
          </ItemContainer>
        )}
      />

      <TotalContainer>
        <TotalText>Subtotal: R$ {subtotal.toFixed(2)}</TotalText>

        <TotalText>Entrega: R$ {deliveryFee.toFixed(2)}</TotalText>

        <TotalText>Total: R$ {total.toFixed(2)}</TotalText>
      </TotalContainer>

      <CheckoutButton onPress={handleCheckout}>
        <CheckoutButtonText>Finalizar Pedido</CheckoutButtonText>
      </CheckoutButton>
    </Container>
  );
}
