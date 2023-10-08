import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {GradientBackround} from '../components/GradientBackground';
import {MovieList} from '../components/MovieList';
import {MoviePoster} from '../components/MoviePoster';
import {useMovie} from '../hooks/useMovie';
import {Movie} from '../interfaces/MovieInterface';
import {getImageColors} from '../helpers/getColors';
import {GradientContext} from '../context/GradientContext';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovie();

  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie: Movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

    setMainColors({
      primary,
      secondary,
    });
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackround>
      <ScrollView>
        <View style={{height: 440}}>
          <Carousel
            width={windowWidth}
            data={nowPlaying}
            mode="parallax"
            modeConfig={{
              snapDirection: 'left',
            }}
            renderItem={({index, item}) => (
              <MoviePoster key={index} movie={item} />
            )}
            onSnapToItem={index => getPosterColors(index)}
          />
        </View>

        <MovieList movies={popular} title="Populares" />
        <MovieList movies={topRated} title="Top Rated" />
        <MovieList movies={upcoming} title="Upcoming" />
      </ScrollView>
    </GradientBackround>
  );
};
