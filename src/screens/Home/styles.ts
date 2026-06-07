import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CategoriesContainer = styled.ScrollView.attrs({
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

export const CategoryButton = styled.TouchableOpacity<CategoryButtonProps>`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 5px 18px;
    margin-right: 10px;
    border-radius: 20px;
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary : '#E5E5E5'};
  `;

export const CategoryText = styled.Text<CategoryButtonProps>`
    font-size: 14px;
    font-weight: bold;

    color: ${({ isSelected }) => (isSelected ? '#FFF' : '#333')};
  `;
