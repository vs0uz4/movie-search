import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/svelte';

import { store, INITIAL_STATE } from '../store';
import moviesMock from './mocks/movies.json';

import MovieList from '../components/movies/MovieList';

const setStore = ({ movies }) => {
  store.set({
      ...INITIAL_STATE,
      wasSearched: true,
      movies,
  });
}

describe("Movie List", () => {
  it("renders a message when a search was made and no movies are returned", () => {
    setStore({ movies: [] });

    const message = 'Nenhum filme encontrado';
    const { getByText } = render(MovieList);

    expect(getByText(message)).toBeInTheDocument();
  });

  it("renders movie list when a search was made and movies are returned", () => {
    setStore({ movies: moviesMock.results });

    const { getByTestId } = render(MovieList);

    expect(getByTestId('movie-list')).toBeInTheDocument();
  });

  it("renders movie list with 2 movies even when the list contains more movies but only 2 of them contain backdrop_path", () => {
    setStore({ movies: moviesMock.results });

    const { getByTestId, getAllByTestId } = render(MovieList);
    const movieItems = getAllByTestId('movie-item');
    const movies = moviesMock.results;

    expect(getByTestId('movie-list')).toBeInTheDocument();
    expect(movieItems).toHaveLength(2);
    expect(movieItems.length).toBeLessThan(movies.length);
  });

  it("select a movie card when a movie item gets clicked", async () => {
    setStore({ movies: moviesMock.results });

    const { getAllByTestId } = render(MovieList);
    const movieItem = getAllByTestId('movie-item')[0];

    await fireEvent.click(movieItem);

    expect(movieItem).toHaveClass('bg-red-200');
  });

  it("toggles card selection when a card is clicked a second time", async () => {
    setStore({ movies: moviesMock.results });

    const { getAllByTestId } = render(MovieList);
    const movieItem = getAllByTestId('movie-item')[0];

    await fireEvent.click(movieItem);
    expect(movieItem).toHaveClass('bg-red-200');

    await fireEvent.click(movieItem);
    expect(movieItem).not.toHaveClass('bg-red-200');
  });

  it("removes select from the first clicked card when a second card is clicked", async () => {
    setStore({ movies: moviesMock.results });

    const { getAllByTestId } = render(MovieList);
    const [movieItem1, movieItem2] = getAllByTestId('movie-item');

    await fireEvent.click(movieItem1);
    expect(movieItem1).toHaveClass("bg-red-200");
    expect(movieItem2).not.toHaveClass("bg-red-200");

    await fireEvent.click(movieItem2);
    expect(movieItem1).not.toHaveClass("bg-red-200");
    expect(movieItem2).toHaveClass("bg-red-200");
  });

});
