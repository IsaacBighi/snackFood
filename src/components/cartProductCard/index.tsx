import { View } from 'react-native';
import { Button } from '../Button';
import {
  Container,
  ProductCategory,
  ProductName,
  ProductPrice,
} from './styles';

interface ProductCardProps {
  name: string;
  category: string;
  price: number;
  image?: string;
  onAddToCart: () => void;
}

export function ProductCard({
  name,
  category,
  price,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Container>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ProductName>{name}</ProductName>
        <ProductCategory>{category}</ProductCategory>
        <ProductPrice>R$ {Number(price).toFixed(2)}</ProductPrice>
      </View>

      <View style={{ marginTop: 12 }}>
        <Button title="Adicionar ao carrinho" onPress={onAddToCart} />
      </View>
    </Container>
  );
}
