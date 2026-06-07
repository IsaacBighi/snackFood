import { useState } from 'react';
import { FlatList } from 'react-native';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/cartContext';
import { products } from '../../data/products';

import {
  CategoriesContainer,
  CategoryButton,
  CategoryText,
  Container,
} from './styles';

const categories = ['Todos', 'Lanche', 'Pizza', 'Bebida', 'Sobremesa', 'Combo'];

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const { addToCart } = useCart();

  const filteredProducts: Product[] =
    selectedCategory === 'Todos'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  function handleAddToCart(product: Product) {
    addToCart(product);
  }

  return (
    <Container>
      <CategoriesContainer>
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <CategoryButton
              key={category}
              isSelected={isSelected}
              onPress={() => setSelectedCategory(category)}
            >
              <CategoryText isSelected={isSelected}>{category}</CategoryText>
            </CategoryButton>
          );
        })}
      </CategoriesContainer>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            category={item.category}
            price={item.price}
            image={item.image}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
      />
    </Container>
  );
}
