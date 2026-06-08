import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Platform, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/authContext';
import { type CartItem, getCartByUser } from '../../sqlite';
import type { RootStackParamList } from '../../types/navigation';

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

// Substitui o tipo 'any' pela tipagem correta de navegação do seu projeto
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function Checkout() {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const navigation = useNavigation<NavigationProps>();

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
    if (Platform.OS === 'web') {
      alert('Sucesso 🎉\nSeu pedido foi recebido e já está sendo preparado!');
      navigation.navigate('App'); // Certifique-se de que 'App' ou 'home' é o nome correto da rota pós-checkout no seu RootStackParamList
    } else {
      Alert.alert(
        'Sucesso 🎉',
        'Seu pedido foi recebido e já está sendo preparado!',
        [{ text: 'OK', onPress: () => navigation.navigate('App') }],
      );
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
