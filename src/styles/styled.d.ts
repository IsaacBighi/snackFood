import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight: string;

      background: string;

      text: string;

      gray: string;

      border: string;
    };
  }
}
