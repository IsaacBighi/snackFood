import { createDrawerNavigator } from '@react-navigation/drawer';

import { Cart } from '../screens/Cart/index';
import { Checkout } from '../screens/Checkout/index';
import { Home } from '../screens/Home/index';

const Drawer = createDrawerNavigator();

export function AppRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6B00',
        },

        headerTintColor: '#FFF',

        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
    >
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          title: 'Cardápio',
        }}
      />

      <Drawer.Screen
        name="cart"
        component={Cart}
        options={{
          title: 'Carrinho',
        }}
      />

      <Drawer.Screen
        name="checkout"
        component={Checkout}
        options={{
          title: 'Checkout',
        }}
      />
    </Drawer.Navigator>
  );
}
