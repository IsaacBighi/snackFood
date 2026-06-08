import { Text, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  padding: 24px;
  background-color: #FAFAFA;
`;

export const Title = styled(Text)`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 32px;
  color: #1A1A1A;
`;

export const Form = styled(View)`
  width: 100%;
`;
