import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'b64d40318490e077d858f5673bb76056',
    language: 'es-ES',
  },
});

export default movieDB;
