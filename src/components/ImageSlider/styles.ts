import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity } from 'react-native';

interface ImageIndexProps {
  active: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const ImageIndex = styled(TouchableOpacity)<ImageIndexProps>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  margin-left: 8px;

  background-color: ${(props) => props.active ? props.theme.colors.title : props.theme.colors.shape};
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;

  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image`
  width: 280px;
  height: 132px;
`;
