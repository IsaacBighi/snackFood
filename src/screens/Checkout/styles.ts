import styled from 'styled-components/native';

interface ButtonProps {
  disabled: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: #FAFAFA;
  padding: 16px;
`;

export const CenterContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ErrorText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const SectionCard = styled.View`
  background-color: #FFF;
  border-radius: 12px;
  padding: 16px;
  elevation: 2;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #1A1A1A;
  margin-bottom: 12px;
  border-bottom-width: 1px;
  border-color: #F0F0F0;
  padding-bottom: 8px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 6px;
`;

export const ItemText = styled.Text`
  font-size: 14px;
  color: #555;
  flex: 1;
`;

export const ItemName = styled.Text`
  color: #1A1A1A;
`;

export const ValueText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
`;

export const LabelText = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const TotalDivider = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top-width: 1px;
  border-color: #F0F0F0;
`;

export const TotalLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #1A1A1A;
`;

export const TotalValue = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #E8390E;
`;

export const SubmitButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${props => props.disabled ? '#CCC' : '#E8390E'};
  border-radius: 12px;
  padding-vertical: 16px;
  align-items: center;
  justify-content: center;
  margin-top: auto;
`;

export const SubmitButtonText = styled.Text`
  color: #FFF;
  font-size: 16px;
  font-weight: bold;
`;