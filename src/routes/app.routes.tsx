import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useAuth } from '../context/authContext';

import { Cart } from '../screens/Cart/index';
import { Checkout } from '../screens/Checkout/index';
import { Home } from '../screens/Home/index';

const Drawer = createDrawerNavigator();

// Componente customizado do interior do Drawer focado na melhoria do cabeçalho
function CustomDrawerContent(props: any) {
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();

  function handleLogout() {
    logout();
    navigation.navigate('Login');
  }

  // Pega a primeira letra do nome para o Avatar (ex: "Isaac" -> "I")
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: '#FFF' }}
    >
      {/* CADEÇALHO MELHORADO E ESTILIZADO */}
      <View
        style={{
          paddingTop: 40,
          paddingHorizontal: 20,
          paddingBottom: 24,
          backgroundColor: '#E8390E', // Cor principal identica ao seu theme.ts
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          marginBottom: 12,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Avatar Circular com as Iniciais */}
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: '#FAECE7', // primaryLight do seu tema
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 14,
              borderWidth: 2,
              borderColor: '#FFF',
            }}
          >
            <Text
              style={{
                color: '#E8390E',
                fontSize: 22,
                fontWeight: 'bold',
              }}
            >
              {userInitial}
            </Text>
          </View>

          {/* Textos de identificação do Usuário */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 13,
                fontWeight: '600',
                opacity: 0.8,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Bem-vindo,
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#FFF',
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 2,
              }}
            >
              {user?.name || 'Usuário'}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#FAECE7',
                fontSize: 13,
                opacity: 0.9,
                marginTop: 2,
              }}
            >
              {user?.email || 'usuario@email.com'}
            </Text>
          </View>
        </View>
      </View>

      {/* Renderiza a lista padrão de telas do Menu */}
      <DrawerItemList {...props} />

      {/* Rodapé fixo com botão de Sair (CORRIGIDO) */}
      <View
        style={{
          marginTop: 'auto',
          borderTopWidth: 1,
          borderColor: '#F5F5F5',
          padding: 10,
        }}
      >
        <DrawerItem
          label="Sair da Conta"
          labelStyle={{ color: '#E8390E', fontWeight: 'bold' }}
          onPress={handleLogout}
          icon={() => <Text style={{ fontSize: 16 }}>🚪</Text>}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export function AppRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E8390E', // Ajustado para bater com a cor do seu theme.ts
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        drawerActiveTintColor: '#E8390E',
        drawerInactiveTintColor: '#1A1A1A',
        drawerLabelStyle: {
          fontWeight: 'bold',
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
