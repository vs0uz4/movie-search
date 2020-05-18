import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';

import App from '../App';

describe("App", () => {
  it("mounts Movies on App", () => {
    const { getByTestId } = render(App);

    expect(getByTestId('movies')).toBeInTheDocument();
  });
});