import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import Gasoline from '../../assets/gasoline.svg';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface CarProps extends RectButtonProps {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

export function Car({ brand, name, rent, thumbnail, ...rest }: CarProps) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{rent.period}</Period>
            <Price>{Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(rent.price)}</Price>
          </Rent>

          <Type>
            <Gasoline />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: thumbnail }} resizeMode="contain" />
    </Container>
  );
}
