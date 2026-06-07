import type { TextInputProps } from 'react-native';
import { Container, InputField, Label } from './styles';

type props = TextInputProps & {
  label: string;
  error?: string;
};

export function Input({ label, error, ...rest }: props) {
  return (
    <Container>
      <Label>{label}</Label>

      <InputField hasError={!!error} {...rest} />

      {error && <Label style={{ color: 'red' }}>{error}</Label>}
    </Container>
  );
}
