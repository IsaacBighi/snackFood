import styled from 'styled-components/native';

type InputProps = {
  hasError?: boolean;
};

export const Container = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 6px;

  color: ${({ theme }) => theme.colors.text};
`;

export const InputField = styled.TextInput.attrs<InputProps>(() => ({
  placeholderTextColor: '#999',
}))<InputProps>`
  width: 100%;
  height: 52px;

  padding: 0 16px;

  border-radius: 10px;
  border-width: 1px;

  border-color: ${({ theme, hasError }) =>
    hasError ? '#FF4D4D' : theme.colors.border};

  background-color: #fff;
`;
