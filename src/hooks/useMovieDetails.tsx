import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {Cast, Credits, FullMovieDetails} from '../interfaces/MovieInterface';

interface MovieDetails {
  isLoading: boolean;
  cast: Cast[];
  movieFull: FullMovieDetails;
}

export const useMovieDetails = (movieId: number) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails>({
    cast: [],
    isLoading: true,
    movieFull: undefined,
  });

  const getMovieDetails = async () => {
    const movieDetailsPromise = movieDB.get<FullMovieDetails>(`/${movieId}`);
    const creditsPromise = movieDB.get<Credits>(`/${movieId}/credits`);

    const [movieDetailsResponse, creditsResponse] = await Promise.all([
      movieDetailsPromise,
      creditsPromise,
    ]);

    setMovieDetails({
      isLoading: false,
      cast: creditsResponse.data.cast,
      movieFull: movieDetailsResponse.data as FullMovieDetails,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {...movieDetails};
};
