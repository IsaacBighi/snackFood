import { Text, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
    flex: 1;
    justify-content: center;
    padding: 24px;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled(Text)`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 32px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Form = styled(View)`
  width: 100%;
`;
