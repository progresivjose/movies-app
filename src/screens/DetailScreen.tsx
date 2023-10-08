import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackNavigation} from '../navigation/Navigation';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {MovieDetails} from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackNavigation, 'Detail'> {}

export const DetailScreen = ({route}: Props) => {
  const movie = route.params;
  const {isLoading, movieFull, cast} = useMovieDetails(movie.id);
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{uri}} style={styles.posterImage} />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <View style={styles.marginContainer}>
          <ActivityIndicator size={30} color="grey" style={{marginTop: 20}} />
        </View>
      ) : (
        <View style={styles.marginContainer}>
          <MovieDetails movieFull={movieFull!} cast={cast} />
        </View>
      )}

      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={50} style={styles.backButton} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  posterImage: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 20,
  },
  imageBorder: {
    flex: 1,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    overflow: 'hidden',
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  backButtonContainer: {
    top: 5,
    left: 5,
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 100,
    opacity: 0.7,
  },
  backButton: {
    color: 'white',
    elevation: 9,
  },
});
