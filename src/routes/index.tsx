import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '../context/authContext';
import { CartProvider } from '../context/cartContext';
import { Login } from '../screens/Login/index';
import { Register } from '../screens/Register/index';
import { AppRoutes } from './app.routes';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="App" component={AppRoutes} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
