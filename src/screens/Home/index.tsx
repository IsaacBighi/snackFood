import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/cartContext';
import { products } from '../../data/products';

import {
  CategoriesContainer,
  CategoryButton,
  CategoryText,
  Container,
} from './styles';

const CATEGORIES = ['Todos', 'Lanche', 'Pizza', 'Bebida', 'Sobremesa', 'Combo'];

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { addItem } = useCart();

  const filteredProducts =
    selectedCategory === 'Todos'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <Container>
      <View style={{ height: 50 }}>
        <CategoriesContainer>
          {CATEGORIES.map((category) => (
            <CategoryButton
              key={category}
              isSelected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            >
              <CategoryText isSelected={selectedCategory === category}>
                {category}
              </CategoryText>
            </CategoryButton>
          ))}
        </CategoriesContainer>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            category={item.category}
            price={item.price}
            image={item.image}
            onAddToCart={() => {
              addItem({
                id: String(item.id),
                name: item.name,
                category: item.category,
                price: Number(item.price),
                image: item.image || '',
              });
            }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
