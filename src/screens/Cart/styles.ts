import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FAFAFA;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
`;

export const EmptyIcon = styled.Text`
  font-size: 40px;
  margin-bottom: 16px;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #666;
`;

export const Card = styled.View`
  flex-direction: row;
  background-color: #FFF;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const ProductImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  background-color: #F5F5F5;
`;

export const InfoContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const ProductName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #1A1A1A;
`;

export const ProductCategory = styled.Text`
  font-size: 12px;
  color: #888;
  margin-vertical: 2px;
`;

export const ProductPrice = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #E8390E;
`;

export const ActionsContainer = styled.View`
  align-items: flex-end;
  justify-content: space-between;
  height: 70px;
`;

export const RemoveButton = styled.TouchableOpacity`
  background-color: #FFF5F5;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  border-radius: 6px;
  border-width: 1px;
  border-color: #FFE3E3;
`;

export const RemoveButtonText = styled.Text`
  color: #FF4D4D;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const QuantityControl = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #F5F5F5;
  border-radius: 20px;
  padding: 4px;
`;

export const QuantityButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: #FFF;
  align-items: center;
  justify-content: center;
  elevation: 1;
`;

export const QuantityButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const QuantityText = styled.Text`
  margin-horizontal: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #FFF;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  elevation: 10;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
`;

export const TotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const TotalLabel = styled.Text`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

export const TotalValue = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #1A1A1A;
`;

export const CheckoutButton = styled.TouchableOpacity`
  background-color: #E8390E;
  border-radius: 12px;
  padding-vertical: 14px;
  align-items: center;
  justify-content: center;
`;

export const CheckoutButtonText = styled.Text`
  color: #FFF;
  font-size: 16px;
  font-weight: bold;
`;