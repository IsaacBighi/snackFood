import { Image, Text } from 'react-native';

import {
  ActionButton,
  Actions,
  Category,
  Container,
  ImageBox,
  Info,
  InfoRow,
  Name,
  Price,
  Quantity,
  QuantityControls,
  RemoveButton,
} from './styles';

type Props = {
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;

  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function CartProductCard({
  name,
  category,
  price,
  image,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <Container>
      <InfoRow>
        <ImageBox>
          <Image
            source={{ uri: image }}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </ImageBox>

        <Info>
          <Name numberOfLines={1}>{name}</Name>

          <Category>{category}</Category>

          <Price>R$ {price.toFixed(2)}</Price>
        </Info>
      </InfoRow>

      <Actions>
        <QuantityControls>
          <ActionButton onPress={onDecrease}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              -
            </Text>
          </ActionButton>

          <Quantity>{quantity}</Quantity>

          <ActionButton onPress={onIncrease}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              +
            </Text>
          </ActionButton>
        </QuantityControls>

        <RemoveButton onPress={onRemove}>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            🗑
          </Text>
        </RemoveButton>
      </Actions>
    </Container>
  );
}
