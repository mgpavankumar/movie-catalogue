import { v4 as uuidv4 } from 'uuid';

export class Movie {
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
        if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
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

export class MoviesDatabase {
    private movies: Map<string, Movie> = new Map();

    private copyMovie(movie: Movie): Movie {
        const copy = new Movie(movie.id, movie.title, movie.director, movie.releaseYear, movie.genre);
        copy.ratings = [...movie.ratings];
        return copy;
    }

    // Add a movie
    addMovie(title: string, director: string, releaseYear: number, genre: string): string {
        if (!title.trim() || !director.trim() || !genre.trim() || !Number.isInteger(releaseYear) || releaseYear < 1888) {
            throw new Error("Invalid movie details.");
        }
        const id = uuidv4();
        const movie = new Movie(id, title, director, releaseYear, genre);
        this.movies.set(id, movie);
        return id;
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
        return Array.from(this.movies.values(), movie => this.copyMovie(movie)).sort((a, b) => (b.getAverageRating() || 0) - (a.getAverageRating() || 0));
    }

    // Get all movies of a genre
    getMoviesByGenre(genre: string): Movie[] {
        return Array.from(this.movies.values(), movie => this.copyMovie(movie)).filter(movie => movie.genre === genre);
    }

    // Get all movies by a director
    getMoviesByDirector(director: string): Movie[] {
        return Array.from(this.movies.values(), movie => this.copyMovie(movie)).filter(movie => movie.director === director);
    }

    // Search movies based on keyword in title
    searchMoviesBasedOnKeyword(keyword: string): Movie[] {
        return Array.from(this.movies.values(), movie => this.copyMovie(movie)).filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
    }

    // Get movie details
    getMovie(id: string): Movie | undefined {
        const movie = this.movies.get(id);
        return movie ? this.copyMovie(movie) : undefined;
    }

    // Remove a movie
    removeMovie(id: string): void {
        if (!this.movies.has(id)) {
            throw new Error("Movie not found.");
        }
        this.movies.delete(id);
    }
}

