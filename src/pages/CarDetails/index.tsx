import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  SliderContainer,
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
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;
  const theme = useTheme();
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value,
        [0, 200],
        [200, 80],
        Extrapolate.CLAMP,
      ),
    };
  });

  const sliderStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    }
  });

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car });
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Animated.View style={[headerStyle, { position: 'absolute', overflow: 'hidden', zIndex: 1, backgroundColor: theme.colors.background_secondary }]}>
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
        </Header>

        <SliderContainer as={Animated.View} style={sliderStyle}>
          <ImageSlider imagesUrl={car.photos} />
        </SliderContainer>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16} // Frames por segundo renderizado por scroll (1000ms / 60 -> 16.666 = 60fps)
      >
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
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container >
  );
}
