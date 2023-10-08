import React from 'react';
import {Image, StyleSheet, Text, View, ViewComponent} from 'react-native';
import {Cast} from '../interfaces/MovieInterface';

interface Props {
  person: Cast;
}

export const CastItem = ({person}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${person.profile_path}`;
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        {!!person.profile_path && (
          <Image source={{uri}} style={styles.profile} />
        )}
        <View style={styles.personInfo}>
          <Text style={styles.personName}>{person.name}</Text>
          <Text style={styles.detailText}>{person.character}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 2,
  },
  personInfo: {
    marginLeft: 10,
    paddingRight: 5,
  },
  personName: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailText: {
    color: 'black',
    opacity: 0.7,
  },
  profile: {
    width: 50,
    height: 60,
    borderRadius: 10,
  },
});
