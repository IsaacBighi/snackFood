import {
  createDrawerNavigator,
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useAuth } from '../context/authContext';
import { Cart } from '../screens/Cart';
import { Checkout } from '../screens/Checkout';
import { Home } from '../screens/Home';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { signOut } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair da Conta"
        labelStyle={{ color: '#FF4D4D', fontWeight: 'bold' }}
        onPress={() => signOut()}
      />
    </DrawerContentScrollView>
  );
}

export function AppRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: '#FFF',
        headerStyle: { backgroundColor: '#E8390E' },
        drawerActiveTintColor: '#E8390E',
      }}
    >
      <Drawer.Screen
        name="home"
        component={Home}
        options={{ title: 'Cardápio Inicial' }}
      />
      <Drawer.Screen
        name="cart"
        component={Cart}
        options={{ title: 'Meu Carrinho' }}
      />
      <Drawer.Screen
        name="checkout"
        component={Checkout}
        options={{ title: 'Finalizar Pedido' }}
      />
    </Drawer.Navigator>
  );
}
