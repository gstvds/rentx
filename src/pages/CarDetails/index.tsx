import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  SliderContainer,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car });
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>

      <SliderContainer>
        <ImageSlider imagesUrl={car.photos} />
      </SliderContainer>

      <Content>
        <Details>
          <Description>
            <Brand>
              {car.brand}
            </Brand>
            <Name>
              {car.name}
            </Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.rent.price)}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map((accessory) => (
              <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
            ))
          }
        </Accessories>

        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
