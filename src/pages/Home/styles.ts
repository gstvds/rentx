import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarDTO } from '../../dtos/CarDTO';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;
  background-color: ${(props) => props.theme.colors.header};

  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${(props) => props.theme.fonts.primary_400};
  color: ${(props) => props.theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const MyCarsButton = styled(RectButton)`
  height: 60px;
  width: 60px;
  border-radius: 30px;

  background-color: ${(props) => props.theme.colors.primary};
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 13px;
  right: 22px;
`;

export const MyCarsButtonIcon = styled(Ionicons)`
  font-size: ${RFValue(32)}px;
  color: ${(props) => props.theme.colors.shape};
`;
