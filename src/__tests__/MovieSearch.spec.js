import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/svelte';

import MovieSearch from '../components/movies/MovieSearch';
import { fetchMovies, resetMovies } from '../services/movie-api';
import { store, INITIAL_STATE } from '../store';

jest.mock('../services/movie-api');

describe("Movie Search", () => {
  afterEach( () => {
    jest.resetAllMocks();
  });

  it("renders a form control", () => {
    const { getByTestId } = render(MovieSearch);

    expect(getByTestId('search-form')).toBeInTheDocument();
  });

  it("renders an input control", () => {
    const { getByTestId } = render(MovieSearch);

    expect(getByTestId('search-input')).toBeInTheDocument();
  });

  it("executes fetchMovies when form is submitted", async () => {
    const { getByTestId } = render(MovieSearch);

    const term = 'men';
    const form = getByTestId('search-form');
    const input = getByTestId('search-input');

    await fireEvent.input(input, { target: { value: term } });
    await fireEvent.submit(form);

    expect(fetchMovies).toHaveBeenCalledTimes(1);
    expect(fetchMovies).toHaveBeenCalledWith(term);
  });

  it("executes resetMovies when term is cleared after being something else than empty string", async () => {
    store.set({
      ...INITIAL_STATE,
      wasSearched: true,
    });

    const { getByTestId } = render(MovieSearch);

    const input = getByTestId('search-input');

    await fireEvent.input(input, { target: { value: 'men' } });
    await fireEvent.input(input, { target: { value: '' } });

    expect(resetMovies).toHaveBeenCalledTimes(2);
  });
});
