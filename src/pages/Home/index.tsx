import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, Dimensions, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';
const AnimatedButton = Animated.createAnimatedComponent(RectButton);

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { Container, Header, HeaderContent, TotalCars, CarList, MyCarsButton, MyCarsButtonIcon } from './styles';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { AnimatedLoad } from '../../components/AnimatedLoad';

export function Home() {
  const navigation = useNavigation();
  const width = useRef(Dimensions.get('window').width).current;
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const myCarsStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, context: any) {
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive(event, context: any) {
      positionX.value = context.positionX + event.translationX;
      positionY.value = context.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = positionX.value >= (-width / 2) ? withSpring(22) : withSpring(-width + 82);
    },
  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get<CarDTO[]>('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && (
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          )}
        </HeaderContent>
      </Header>

      {
        loading ? (
          <AnimatedLoad />
        ) : (
          <CarList
            data={cars}
            renderItem={({ item }) => (
              <Car
                data={item}
                onPress={() => handleCarDetails(item)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={myCarsStyle}>
          <MyCarsButton as={AnimatedButton} onPress={handleOpenMyCars}>
            <MyCarsButtonIcon name="ios-car-sport" />
          </MyCarsButton>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}
