import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
  padding: 16px; /* Aumentado para dar um espaçamento melhor nas bordas */
  background-color: #FAFAFA;
`;

export const CategoriesContainer = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: 20,
  },
})`
  max-height: 50px;
  margin-bottom: 20px;
`;

type CategoryButtonProps = {
  isSelected: boolean;
};

export const CategoryButton = styled(TouchableOpacity)<CategoryButtonProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px 18px;
  margin-right: 10px;
  border-radius: 20px;
  /* Cor laranja fixa (#E8390E) quando selecionado, cinza quando desmarcado */
  background-color: ${(props) => (props.isSelected ? '#E8390E' : '#E5E5E5')};
`;

export const CategoryText = styled(Text)<CategoryButtonProps>`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.isSelected ? '#FFF' : '#333')};
`;
