# Movie Catalogue & Ratings · TypeScript

[![CI](https://github.com/mgpavankumar/movies/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mgpavankumar/movies/actions/workflows/ci.yml)

An in-memory movie catalogue with UUIDs, rating aggregation, and a deterministic demonstration.

**Author:** [M. G. Pavan Kumar](https://github.com/mgpavankumar)
**Status:** Educational project

## Features

- Create and remove movies
- Rate movies from 1 to 5 and calculate averages
- Search titles and filter by genre or director

## Getting started

Install Node.js 22 or newer and npm. Clone this repository:

```bash
git clone https://github.com/mgpavankumar/movies.git
cd movies
```

```bash
npm ci
```

```bash
npm run build
npm start
```

`npm start` runs the TypeScript entry point with the Node.js `tsx` loader. `npm run build` emits JavaScript into `dist/src`. `npm run dev` watches source files.

## Tests

```bash
npm run typecheck
npm test
```

See [TEST_RESULTS.md](TEST_RESULTS.md) for recorded local verification and its limits.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/MovieDatabase.ts` | Application logic and/or demonstration |
| `src/movies.ts` | Application logic and/or demonstration |
| `tests/` | Automated regression checks |
| `tsconfig.json` | Strict ESM compilation settings |

## Current behavior and limitations

Records are held in memory and disappear when the process stops. The demonstration uses fixed sample ratings; generated UUIDs still vary per run.

## Demonstration

`npm start` adds Inception, The Dark Knight, and Interstellar, applies ratings 4 and 5, and prints an average of **4.5**. It then demonstrates title search, genre/director filters, retrieval, and deletion. UUIDs vary between runs. The reusable class is [MoviesDatabase](src/MovieDatabase.ts).

## Contributing

Keep changes focused, use synthetic data, and include steps or tests demonstrating the fix. Do not commit local configuration or credentials.

Movie getters return independent `Movie` instances with copied ratings; edits to a returned movie do not change the stored catalogue. Use `rateMovie` to update stored ratings.
