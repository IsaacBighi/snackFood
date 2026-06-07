import { ButtonContainer, ButtonText } from './styles';

type props = {
  title: string;
  onPress: () => void;
};

export function Button({ title, onPress }: props) {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
}
