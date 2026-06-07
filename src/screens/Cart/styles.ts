import styled from 'styled-components/native';

type ButtonProps = {
  danger?: boolean;
};

export const Container = styled.View`
  flex: 1;
`;

export const ItemCard = styled.View`
  padding: 16px;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
`;

export const ItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const ItemPrice = styled.Text`
  margin-top: 4px;
`;

export const ItemSubtotal = styled.Text`
  margin-top: 4px;
`;

export const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const QuantityText = styled.Text`
  font-size: 16px;
  margin: 0 10px;
`;

export const ActionButton = styled.Pressable<ButtonProps>`
  padding: 8px;
  margin-right: 10px;
  background-color: ${({ danger }) => (danger ? '#ffdddd' : '#eee')};
  border-radius: 6px;
`;

export const Footer = styled.View`
  padding: 16px;
  border-top-width: 1px;
  border-color: #ddd;
  background-color: #fff;
`;

export const TotalText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const EmptyText = styled.Text`
  text-align: center;
  margin-top: 20px;
`;
