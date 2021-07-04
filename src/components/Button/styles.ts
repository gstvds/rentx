import styled, { DefaultTheme } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
  color?: keyof DefaultTheme['colors'];
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color ? props.theme.colors[props.color] : props.theme.colors.primary};
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${props => props.theme.colors.shape};
`;
