import '@testing-library/jest-dom/extend-expect';
import { render, getByTitle } from '@testing-library/svelte';

import moviesMock from './mocks/movies.json';
import MovieCard from '../components/movies/MovieCard';

describe("Movie Card", () => {
  it("renders the movie poster with proper data", () => {
    const [movie] = moviesMock.results;

    const { getByAltText } = render( MovieCard, {movie} );
    const moviePoster = getByAltText(`Poster: ${movie.title}`);

    expect(moviePoster).toBeInTheDocument();
    expect(moviePoster).toHaveProperty(
      'title',
      `Poster: ${movie.title}`,
    );
    expect(moviePoster).toHaveProperty(
      'src',
      'https://image.tmdb.org/t/p/original/kaPTm06WnoqaHOgGbQaRCrupaKo.jpg'
    );
  })

  it("renders movie card with all relevant content", () => {
    const [movie] = moviesMock.results;
    movie.friendly_date = new Date(movie.release_date).toLocaleDateString();

    const { getByText } = render( MovieCard, {movie} );

    expect(getByText('Men in Black')).toBeInTheDocument();

    const noExactAssertions = [
      "9337",
      "7.1",
      "1997-7-1",
      "a New York City cop is recruited as an agent",
    ]

    noExactAssertions.forEach( (assertion) => {
      expect(getByText(assertion, { exact: false })).toBeInTheDocument();
    });
  });

});
