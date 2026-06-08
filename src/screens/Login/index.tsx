import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/authContext';
import type { RootStackParamList } from '../../types/navigation';
import { Container, Form, Title } from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { signIn } = useAuth();
  const navigation = useNavigation<NavigationProps>();

  async function handleLogin() {
    setEmailError('');
    setPasswordError('');

    let hasError = false;

    if (!email.includes('@')) {
      setEmailError('E-mail inválido');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Senha é obrigatória');
      hasError = true;
    }

    if (hasError) return;

    const success = await signIn(email, password);

    if (!success) {
      setPasswordError('E-mail ou senha incorretos');
      return;
    }

    navigation.navigate('App');
  }

  return (
    <Container>
      <Title>SnackFood</Title>

      <Form>
        <Input
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          error={emailError}
        />

        <Input
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          error={passwordError}
          secureTextEntry
        />

        <Button title="Entrar" onPress={handleLogin} />

        <TouchableOpacity
          onPress={() => navigation.navigate('register')}
          style={{
            marginTop: 20,
            alignSelf: 'center',
            padding: 10,
          }}
        >
          <Text
            style={{
              color: '#E8390E',
              fontSize: 16,
              fontWeight: '600',
              textDecorationLine: 'underline',
            }}
          >
            Não tem uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </Form>
    </Container>
  );
}
