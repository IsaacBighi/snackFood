import { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { createUser } from '../../sqlite';
import { Container, Form, Title } from './styles';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleRegister() {
    setNameError('');
    setEmailError('');
    setPasswordError('');

    let hasError = false;

    if (!name) {
      setNameError('Nome obrigatório');
      hasError = true;
    }

    if (!email.includes('@')) {
      setEmailError('E-mail inválido');
      hasError = true;
    }

    if (password.length < 6) {
      setPasswordError('Mínimo 6 caracteres');
      hasError = true;
    }

    if (hasError) return;

    console.log('Registrando usuário:', { name, email, password });
    createUser({
      name,
      email,
      password,
    });
  }

  return (
    <Container>
      <Title>Criar Conta</Title>

      <Form>
        <Input
          label="Nome"
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
          error={nameError}
        />

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
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={passwordError}
        />

        <Button title="Cadastrar" onPress={handleRegister} />
      </Form>
    </Container>
  );
}
