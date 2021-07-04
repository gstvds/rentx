import React from 'react';

import type { RectButtonProps } from 'react-native-gesture-handler';
import type { DefaultTheme } from 'styled-components';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: keyof DefaultTheme['colors'];
}

export function Button({ title, color, ...rest }: ButtonProps) {
  return (
    <Container {...rest} color={color}>
      <Title>{title}</Title>
    </Container>
  );
}
