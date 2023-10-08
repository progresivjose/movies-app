import {format} from 'currency-formatter';
import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Cast, FullMovieDetails} from '../interfaces/MovieInterface';
import {CastItem} from './CastItem';

interface Props {
  movieFull: FullMovieDetails;
  cast: Cast[];
}

export const MovieDetails = ({movieFull, cast}: Props) => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Icon name="star-outline" size={20} color="grey" />

        <Text style={styles.detailText}>{movieFull.vote_average}</Text>

        <Text style={styles.detailText}>
          {' '}
          - {movieFull.genres.map(genre => genre.name).join(', ')}
        </Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Historia</Text>
        <Text style={styles.detailText}>{movieFull.overview}</Text>
        <Text style={styles.sectionTitle}>Presupuesto</Text>
        <Text style={styles.detailText}>
          {format(movieFull.budget, {code: 'USD'})}
        </Text>
      </View>

      <View style={{paddingVertical: 10}}>
        <Text style={styles.sectionTitle}>Actores</Text>
        {
          <FlatList
            data={cast}
            horizontal={true}
            keyExtractor={item => item.id.toString() + '-person'}
            renderItem={item => <CastItem person={item.item} />}
          />
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  detailText: {
    color: 'black',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});
