import type { NavigationProp } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Platform, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/authContext';
import { useCart } from '../../context/cartContext';
import { type CartItem, getCartByUser } from '../../sqlite';

import {
  CenterContainer,
  Container,
  ErrorText,
  ItemName,
  ItemText,
  LabelText,
  Row,
  SectionCard,
  SectionTitle,
  SubmitButton,
  SubmitButtonText,
  TotalDivider,
  TotalLabel,
  TotalValue,
  ValueText,
} from './styles';

type DrawerParamList = {
  home: undefined;
  cart: undefined;
  checkout: undefined;
};

export function Checkout() {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const { clearCart } = useCart();
  const navigation =
    useNavigation<NavigationProp<DrawerParamList, 'checkout'>>();

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        const cartItems = getCartByUser(user.id);
        setItems(cartItems);
      }
    }, [user?.id]),
  );

  if (!user?.id) {
    return (
      <CenterContainer>
        <ErrorText>Usuário não encontrado</ErrorText>
      </CenterContainer>
    );
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal > 0 ? 5.0 : 0;
  const total = subtotal + deliveryFee;

  function handleFinishOrder() {
    clearCart();

    const successMessage =
      'Sucesso 🎉\nSeu pedido foi recebido e já está sendo preparado!';

    if (Platform.OS === 'web') {
      alert(successMessage);
      navigation.navigate('home');
    } else {
      Alert.alert('Sucesso 🎉', successMessage, [
        { text: 'OK', onPress: () => navigation.navigate('home') },
      ]);
    }
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
              <ValueText>
                R$ {(item.price * item.quantity).toFixed(2)}
              </ValueText>
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

      <TouchableOpacity
        onPress={handleFinishOrder}
        disabled={items.length === 0}
        activeOpacity={0.7}
        style={{ marginTop: 'auto', width: '100%' }}
      >
        <SubmitButton>
          <SubmitButtonText>Confirmar e Finalizar Pedido</SubmitButtonText>
        </SubmitButton>
      </TouchableOpacity>
    </Container>
  );
}
