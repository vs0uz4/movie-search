import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';

import Movies from '../components/movies/Movies';

describe("Movies", () => {
  it("mounts MovieSeach and MovieList", () => {
    const { getByTestId } = render(Movies);

    expect(getByTestId('movie-search')).toBeInTheDocument();
    expect(getByTestId('movie-list')).toBeInTheDocument();
  });
});