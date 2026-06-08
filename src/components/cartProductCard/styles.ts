import { Text, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  width: 95%;
  padding: 16px;
  margin: 0 auto 16px;
  border-radius: 16px;
  background-color: #fff;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 5px;
`;

// Corrigido: Mudou de Name para ProductName e usa cor fixa estável para a Web
export const ProductName = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #1A1A1A;
`;

// Corrigido: Mudou de Category para ProductCategory
export const ProductCategory = styled(Text)`
  font-size: 14px;
  margin-top: 4px;
  color: #666;
`;

// Corrigido: Mudou de Price para ProductPrice e usa o laranja principal fixo
export const ProductPrice = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
  color: #E8390E;
`;
