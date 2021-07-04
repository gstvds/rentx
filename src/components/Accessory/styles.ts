import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: ${RFValue(95)}px;
  height: ${RFValue(92)}px;

  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colors.background_primary};
  padding: 16px;
  margin-bottom: 8px;
`;

export const Name = styled.Text`
  font-family: ${(props) => props.theme.fonts.primary_500};
  color: ${(props) => props.theme.colors.text};
  font-size: ${RFValue(13)}px;
  text-align: center;
`;
