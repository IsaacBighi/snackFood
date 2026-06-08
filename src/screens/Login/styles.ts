import { Text, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
    padding: 0 24px;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled(Text)`
    font-size: 32px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
`;

export const Form = styled(View)`
    width: 100%;
`;
