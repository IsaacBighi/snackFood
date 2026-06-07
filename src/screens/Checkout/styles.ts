import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;

  margin-bottom: 20px;
`;

export const ItemContainer = styled.View`
  flex-direction: row;

  justify-content: space-between;

  background-color: #fff;

  padding: 14px;

  border-radius: 12px;

  margin-bottom: 10px;
`;

export const ItemName = styled.Text`
  font-size: 16px;
`;

export const ItemPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const TotalContainer = styled.View`
  margin-top: 20px;
`;

export const TotalText = styled.Text`
  font-size: 18px;
  font-weight: bold;

  margin-bottom: 8px;
`;

export const CheckoutButton = styled.TouchableOpacity`
  margin-top: 20px;

  padding: 16px;

  border-radius: 12px;

  align-items: center;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const CheckoutButtonText = styled.Text`
  color: #fff;

  font-size: 16px;
  font-weight: bold;
`;
