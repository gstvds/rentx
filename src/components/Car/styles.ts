import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  height: 126px;
  background-color: ${(props) => props.theme.colors.background_secondary};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 24px;
  margin-bottom: 16px;
`;

export const Details = styled.View``;

export const Brand = styled.Text`
  font-family: ${(props) => props.theme.fonts.secondary_500};
  color: ${(props) => props.theme.colors.text_details};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${(props) => props.theme.fonts.secondary_500};
  color: ${(props) => props.theme.colors.title};
  font-size: ${RFValue(15)}px;
`;

export const About = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

export const Rent = styled.View`
  margin-right: 24px;
`;

export const Period = styled.Text`
  font-family: ${(props) => props.theme.fonts.secondary_500};
  color: ${(props) => props.theme.colors.text_details};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-family: ${(props) => props.theme.fonts.secondary_500};
  color: ${(props) => props.theme.colors.primary};
  font-size: ${RFValue(15)}px;
`;

export const Type = styled.View``;

export const CarImage = styled.Image`
  width: 167px;
  height: 85px;
`;