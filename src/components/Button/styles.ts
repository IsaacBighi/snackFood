import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
    width: 100%;
    height: 52px;

    justify-content: center;
    align-items: center;

    border-radius: 8px;

    background-color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;

    color: #fff;
`;
