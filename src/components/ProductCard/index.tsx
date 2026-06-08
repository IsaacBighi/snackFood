import { Image, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components';
import { Category, Container, Name, Price } from './styles';

type Props = {
  name: string;
  category: string;
  price: number;
  image: string;

  onAddToCart: () => void;
};

export function ProductCard({
  name,
  category,
  price,
  image,
  onAddToCart,
}: Props) {
  const { colors } = useTheme();

  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: 90,
            height: 90,
            borderRadius: 12,
            marginRight: 14,
          }}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Name numberOfLines={1}>{name}</Name>

          <Category>{category}</Category>

          <Price>R$ {Number(price).toFixed(2)}</Price>
        </View>
      </View>

      <TouchableOpacity
        onPress={onAddToCart}
        style={{
          marginTop: 16,
          backgroundColor: colors.primary,
          paddingVertical: 14,
          borderRadius: 12,
        }}
      >
        <Category
          style={{
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Adicionar ao carrinho
        </Category>
      </TouchableOpacity>
    </Container>
  );
}
