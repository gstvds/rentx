import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

import { Car } from '../../components/Car';

export function Home() {
  const navigation = useNavigation();

  function handleCarDetails() {
    navigation.navigate('CarDetails');
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={({ item }) => (
          <Car
            brand="audi"
            name="RS 5 Coupé"
            thumbnail="https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png"
            rent={{
              period: 'Ao dia',
              price: 120,
            }}
            onPress={handleCarDetails}
          />
        )}
        keyExtractor={(item) => String(item)}
      />
    </Container>
  );
}
