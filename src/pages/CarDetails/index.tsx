import React from 'react';
import { useNavigation } from '@react-navigation/native';

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

import Speed from '../../assets/speed.svg';
import Acceleration from '../../assets/acceleration.svg';
import Force from '../../assets/force.svg';
import Gasoline from '../../assets/gasoline.svg';
import Exchange from '../../assets/exchange.svg';
import People from '../../assets/people.svg';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

export function CarDetails() {
  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate('Scheduling');
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>

      <SliderContainer>
        <ImageSlider imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']} />
      </SliderContainer>

      <Content>
        <Details>
          <Description>
            <Brand>
              Lamborghini
            </Brand>
            <Name>
              Huracan
            </Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380km/h" icon={Speed} />
          <Accessory name="3.2s" icon={Acceleration} />
          <Accessory name="800hp" icon={Force} />
          <Accessory name="Gasolina" icon={Gasoline} />
          <Accessory name="Auto" icon={Exchange} />
          <Accessory name="2 Pessoas" icon={People} />
        </Accessories>

        <About>
          Este é um automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza
          de Sevilla. É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
