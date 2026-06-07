import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { useAuth } from '../../context/authContext';
import { getCartByUser, CartItem } from '../../sqlite';

import {
  Container,
  CenterContainer,
  ErrorText,
  SectionCard,
  SectionTitle,
  Row,
  ItemText,
  ItemName,
  ValueText,
  LabelText,
  TotalDivider,
  TotalLabel,
  TotalValue,
  SubmitButton,
  SubmitButtonText
} from './styles';

export function Checkout() {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        const cartItems = getCartByUser(user.id);
        setItems(cartItems);
      }
    }, [user?.id])
  );

  if (!user?.id) {
    return (
      <CenterContainer>
        <ErrorText>Usuário não encontrado</ErrorText>
      </CenterContainer>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + deliveryFee;

  function handleFinishOrder() {
    Alert.alert('Sucesso 🎉', 'Seu pedido foi recebido e já está sendo preparado!', [
      { text: 'OK', onPress: () => navigation.navigate('home') }
    ]);
  }

  return (
    <Container>
      <SectionCard>
        <SectionTitle>Resumo dos Itens</SectionTitle>
        <FlatList
          data={items}
          keyExtractor={(item) => item.productId}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Row>
              <ItemText>
                {item.quantity}x <ItemName>{item.name}</ItemName>
              </ItemText>
              <ValueText>R$ {(item.price * item.quantity).toFixed(2)}</ValueText>
            </Row>
          )}
        />
      </SectionCard>

      <SectionCard>
        <SectionTitle>Resumo de Valores</SectionTitle>
        <Row>
          <LabelText>Subtotal</LabelText>
          <ValueText>R$ {subtotal.toFixed(2)}</ValueText>
        </Row>
        <Row>
          <LabelText>Taxa de Entrega</LabelText>
          <ValueText>R$ {deliveryFee.toFixed(2)}</ValueText>
        </Row>
        <TotalDivider>
          <TotalLabel>Valor Total</TotalLabel>
          <TotalValue>R$ {total.toFixed(2)}</TotalValue>
        </TotalDivider>
      </SectionCard>

      <SubmitButton onPress={handleFinishOrder} disabled={items.length === 0}>
        <SubmitButtonText>Confirmar e Finalizar Pedido</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
}