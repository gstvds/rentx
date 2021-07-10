import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import Brand from '../../assets/brand.svg';
import Logo from '../../assets/logo.svg';

import { Container } from './styles';

export function Splash() {
  const navigation = useNavigation();
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP, // Estabelece o limite da animação baseado nos limites determinados nos vetores acima.
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP, // Estabelece o limite da animação baseado nos limites determinados nos vetores acima.
          ),
        },
      ],
    };
  });

  function startApp() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1500 }, () => {
      'worklet' // Worklet é necessário para utilizar a thread responsável pelo JS para executar a função de callback
      runOnJS(startApp)(); // Determina que essa função deverá ser executada na thread responsável pelo JS, pois a animação é executada na thread de UI
    });
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <Brand width={80} height={50} />
      </Animated.View>
      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <Logo width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
