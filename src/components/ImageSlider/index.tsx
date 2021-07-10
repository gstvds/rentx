import React, { useState, useRef } from 'react';
import { StatusBar } from 'react-native';
import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

interface ImageSliderProps {
  imagesUrl: string[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: ImageSliderProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);

  const indexChanged = useRef((info: ChangeImageProps) => {
    info.viewableItems.forEach((item) => {
      if (item.isViewable) setActiveImageIndex(item.index!)
    });
  });

  function handleChangeImage(index: number) {
    scrollRef.current?.scrollToIndex({ animated: true, index });
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ImageIndexes>
        {
          imagesUrl.map((_, index) => (
            <ImageIndex key={String(index)} active={index === activeImageIndex} onPress={() => handleChangeImage(index)} />
          ))
        }
      </ImageIndexes>

      <FlatList
        ref={scrollRef}
        data={imagesUrl}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
