import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const ButtonContainer = styled(TouchableOpacity)`
    width: 100%;
    height: 52px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonText = styled(Text)`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
`;
