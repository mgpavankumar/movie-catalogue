import { v4 as uuidv4 } from 'uuid';

class Movie {
    id: string;
    title: string;
    director: string;
    releaseYear: number;
    genre: string;
    ratings: number[];

    constructor(id: string, title: string, director: string, releaseYear: number, genre: string) {
        this.id = id;
        this.title = title;
        this.director = director;
        this.releaseYear = releaseYear;
        this.genre = genre;
        this.ratings = [];
    }

    addRating(rating: number): void {
        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5.");
        }
        this.ratings.push(rating);
    }

    getAverageRating(): number | undefined {
        if (this.ratings.length === 0) {
            return undefined;
        }
        const sum = this.ratings.reduce((a, b) => a + b, 0);
        return sum / this.ratings.length;
    }
}

class MoviesDatabase {
    private movies: Map<string, Movie> = new Map();

    // Add a movie
    addMovie(title: string, director: string, releaseYear: number, genre: string): void {
        const id = uuidv4();
        const movie = new Movie(id, title, director, releaseYear, genre);
        this.movies.set(id, movie);
    }

    // Rate a movie
    rateMovie(id: string, rating: number): void {
        const movie = this.movies.get(id);
        if (!movie) {
            throw new Error("Movie not found.");
        }
        movie.addRating(rating);
    }

    // Get average rating of a movie
    getAverageRating(id: string): number | undefined {
        const movie = this.movies.get(id);
        if (!movie) {
            return undefined;
        }
        return movie.getAverageRating();
    }

    // Get top-rated movies
    getTopRatedMovies(): Movie[] {
        return Array.from(this.movies.values()).sort((a, b) => (b.getAverageRating() || 0) - (a.getAverageRating() || 0));
    }

    // Get all movies of a genre
    getMoviesByGenre(genre: string): Movie[] {
        return Array.from(this.movies.values()).filter(movie => movie.genre === genre);
    }

    // Get all movies by a director
    getMoviesByDirector(director: string): Movie[] {
        return Array.from(this.movies.values()).filter(movie => movie.director === director);
    }

    // Search movies based on keyword in title
    searchMoviesBasedOnKeyword(keyword: string): Movie[] {
        return Array.from(this.movies.values()).filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
    }

    // Get movie details
    getMovie(id: string): Movie | undefined {
        return this.movies.get(id);
    }

    // Remove a movie
    removeMovie(id: string): void {
        if (!this.movies.has(id)) {
            throw new Error("Movie not found.");
        }
        this.movies.delete(id);
    }
}

// Example usage:
const moviesDB = new MoviesDatabase();

// Adding movies
moviesDB.addMovie("Inception", "Christopher Nolan", 2010, "Sci-Fi");
moviesDB.addMovie("The Dark Knight", "Christopher Nolan", 2008, "Action");
moviesDB.addMovie("Interstellar", "Christopher Nolan", 2014, "Sci-Fi");

// Rating movies with random ratings
const movieIds = Array.from(moviesDB.getTopRatedMovies()).map(movie => movie.id);
movieIds.forEach(id => {
    moviesDB.rateMovie(id, Math.floor(Math.random() * 5) + 1);
    moviesDB.rateMovie(id, Math.floor(Math.random() * 5) + 1);
});

// Get average rating of a movie
console.log(moviesDB.getAverageRating(movieIds[0])); // Output: Random average rating

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
