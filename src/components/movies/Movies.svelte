<script>
  import MovieSearch from './MovieSearch.svelte';
  import MovieList from './MovieList.svelte';
</script>

<main data-testid="movies">
  <div class="container mx-auto">
    <div class="md:mx-4">
      <MovieSearch />
      <MovieList />
    </div>
  </div>
</main>
