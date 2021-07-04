import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

import Arrow from '../../assets/arrow.svg';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface RentalPeriod {
  start: number;
  end: number;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert('Selecione um intervalo para alugar');
    } else {
      navigation.navigate('SchedulingDetails', { car, dates: Object.keys(markedDates) });
    }
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    const interval = generateInterval(start, end);
    setLastSelectedDate(end);
    setMarkedDates(interval);

    setRentalPeriod({ start: start.timestamp, end: end.timestamp })
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header>
        <BackButton color="shape" onPress={() => navigation.goBack()} />

        <Title>
          Escolha uma{'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo selected={!!rentalPeriod.start}>
            <DateTitle>DE</DateTitle>
            <DateValue>
              {
                rentalPeriod.start &&
                Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(getPlatformDate(new Date(rentalPeriod.start)))
              }
            </DateValue>
          </DateInfo>
          <Arrow />
          <DateInfo selected={!!rentalPeriod.end}>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>
              {
                rentalPeriod.end &&
                Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(getPlatformDate(new Date(rentalPeriod.end)))
              }
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
