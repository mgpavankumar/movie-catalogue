import { MoviesDatabase } from "./MovieDatabase.js";


const moviesDB = new MoviesDatabase();

// Adding movies
moviesDB.addMovie("Inception", "Christopher Nolan", 2010, "Sci-Fi");
moviesDB.addMovie("The Dark Knight", "Christopher Nolan", 2008, "Action");
moviesDB.addMovie("Interstellar", "Christopher Nolan", 2014, "Sci-Fi");

// Rating movies with sample ratings
const movieIds = Array.from(moviesDB.getTopRatedMovies()).map(movie => movie.id);
movieIds.forEach(id => {
    moviesDB.rateMovie(id, 4);
    moviesDB.rateMovie(id, 5);
});

// Get average rating of a movie
console.log(moviesDB.getAverageRating(movieIds[0])); // Output: Average rating: 4.5

// Get top-rated movies
console.log(moviesDB.getTopRatedMovies());

// Get movies by genre
console.log(moviesDB.getMoviesByGenre("Sci-Fi"));

// Get movies by director
console.log(moviesDB.getMoviesByDirector("Christopher Nolan"));

// Search movies based on keyword
console.log(moviesDB.searchMoviesBasedOnKeyword("Dark"));

// Get movie details
console.log(moviesDB.getMovie(movieIds[0]));

// Remove a movie
moviesDB.removeMovie(movieIds[0]);
console.log(moviesDB.getMoviesByDirector("Christopher Nolan"));

