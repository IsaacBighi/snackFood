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

export const Name = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const Category = styled(Text)`
  font-size: 14px;
  margin-top: 4px;
  color: #666;
`;

export const Price = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.primary};
`;
