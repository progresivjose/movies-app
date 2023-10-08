import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {Movie} from '../interfaces/MovieInterface';
import {MoviePoster} from './MoviePoster';

interface Props {
  movies: Movie[];
  title?: string;
}

export const MovieList = ({movies, title}: Props) => {
  return (
    <View
      style={{
        height: title !== undefined ? 260 : 220,
      }}>
      {title !== undefined && (
        <Text style={{fontSize: 25, color: 'black', marginLeft: 10}}>
          {title}
        </Text>
      )}
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
      />
    </View>
  );
};
