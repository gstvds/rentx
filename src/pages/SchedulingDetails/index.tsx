import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';

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
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';


import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [loading, setLoading] = useState(false);

  const rentalTotal = Number(dates.length * car.rent.price);

  async function handleConfirm() {
    setLoading(true);
    try {
      const schedule = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...schedule.data.unavailable_dates,
        ...dates,
      ];

      await api.post('schedules_byuser', {
        user_id: 1,
        car,
        startDate: rentalPeriod.start,
        endDate: rentalPeriod.end,
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      });

      return navigation.navigate('SchedulingComplete');
    } catch (error) {
      setLoading(false);
      Alert.alert('Não foi possível finalizar o agendamento');
    }
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, []);

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

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(24)} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.rent.price)} x{dates.length} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rentalTotal)}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button enabled={!loading} loading={loading} title="Alugar agora" color="success" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
