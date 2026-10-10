import test from 'node:test';
import assert from 'node:assert/strict';
import { MoviesDatabase } from '../src/MovieDatabase.js';

test('ratings, discovery, and deletion', () => {
  const db = new MoviesDatabase();
  const first = db.addMovie('Inception', 'Nolan', 2010, 'Sci-Fi');
  const second = db.addMovie('Other', 'Other', 2020, 'Drama');
  db.rateMovie(first, 4); db.rateMovie(first, 5); db.rateMovie(second, 2);
  assert.equal(db.getAverageRating(first), 4.5);
  assert.equal(db.getTopRatedMovies()[0].id, first);
  assert.equal(db.searchMoviesBasedOnKeyword('INCEP').length, 1);
  assert.equal(db.getMoviesByGenre('Sci-Fi').length, 1);
  db.removeMovie(first);
  assert.equal(db.getMovie(first), undefined);
});
test('reject invalid ratings and missing movies', () => {
  const db = new MoviesDatabase();
  const id = db.addMovie('Movie', 'Director', 2000, 'Drama');
  for (const rating of [NaN, Infinity, 0, 6]) assert.throws(() => db.rateMovie(id, rating));
  assert.throws(() => db.rateMovie('missing', 3), /not found/);
});
test('validate movie metadata', () => {
  const db = new MoviesDatabase();
  assert.throws(() => db.addMovie('', 'Director', 2000, 'Drama'), /Invalid/);
  assert.throws(() => db.addMovie('Movie', 'Director', NaN, 'Drama'), /Invalid/);
});

test('returned movies and ratings cannot mutate stored records', () => {
  const db = new MoviesDatabase();
  const id = db.addMovie('Original', 'Director', 2000, 'Drama');
  db.rateMovie(id, 4);
  const results = [db.getMovie(id)!, ...db.getTopRatedMovies(), ...db.getMoviesByGenre('Drama'), ...db.getMoviesByDirector('Director'), ...db.searchMoviesBasedOnKeyword('Original')];
  for (const movie of results) {
    movie.title = 'Changed';
    movie.ratings.push(100);
    movie.addRating(5);
  }
  assert.equal(db.getMovie(id)!.title, 'Original');
  assert.deepEqual(db.getMovie(id)!.ratings, [4]);
  assert.equal(db.getAverageRating(id), 4);
});
