import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/cartContext';
import { products } from '../../data/products';

import { Container } from './styles';

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
  const theme = useTheme();

  const filteredProducts: Product[] =
    selectedCategory === 'Todos'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  function handleAddToCart(product: Product) {
    addToCart(product);
  }

  return (
    <Container>
      <View
        style={{
          backgroundColor: '#FFF',
          margin: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: theme.colors.border || '#F5F5F5',
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}
      >
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={{ height: 50, width: '100%' }}
          dropdownIconColor={theme.colors.primary}
        >
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>

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
