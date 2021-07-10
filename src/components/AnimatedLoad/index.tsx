import React from 'react';
import Lottie from 'lottie-react-native';

import loading from '../../assets/loading.json';

import { Container } from './styles';

interface AnimatedLoadProps {}

export function AnimatedLoad({}: AnimatedLoadProps) {
  return (
    <Container>
      <Lottie source={loading} autoPlay loop style={{ height: 200 }} resizeMode="contain" />
    </Container>
  );
}
