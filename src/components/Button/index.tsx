import React from 'react';
import { ActivityIndicator } from 'react-native';

import type { RectButtonProps } from 'react-native-gesture-handler';
import { DefaultTheme, useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  enabled?: boolean;
  loading?: boolean;
  color?: keyof DefaultTheme['colors'];
}

export function Button({ title, color, enabled = true, loading = false, ...rest }: ButtonProps) {
  const theme = useTheme();

  return (
    <Container {...rest} enabled={enabled} color={color} style={{ opacity: (!enabled || loading) ? 0.5 : 1 }} >
      {loading ? <ActivityIndicator color={theme.colors.shape} /> : <Title>{title}</Title>}
    </Container>
  );
}
