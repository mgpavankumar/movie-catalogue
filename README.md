# Movie Catalogue & Ratings · TypeScript

An in-memory movie catalogue demonstrating object-oriented TypeScript, UUID identifiers, search, filtering, and rating aggregation.

**Author:** [M. G. Pavan Kumar](https://github.com/mgpavankumar)  
**Status:** Educational project

## Features

- Add and remove movies with generated UUIDs
- Accept ratings from 1 to 5 and calculate average scores
- Sort movies by rating
- Filter by genre or director and search titles

## Getting started

Install Node.js and npm. Clone this repository:

```bash
git clone https://github.com/mgpavankumar/movies.git
cd movies
```

```bash
npm install
npm start
```

## Project structure

| Path | Purpose |
| --- | --- |
| `src/movies.ts` | Movie model, catalogue operations, and sample usage |
| `package.json` | Dependencies and start script |
| `tsconfig.json` | TypeScript compiler settings |

## Current behavior and limitations

The bundled demonstration uses random ratings, so the output varies between runs. Data is lost when the process stops. The repository contains an empty `tscongif.json` alongside the actual `tsconfig.json`. UUID module compatibility should be checked if the CommonJS-based runner fails on your Node.js version; the example has not been runtime-verified in this documentation change.

## Planned improvements

- Separate the model, service, and sample runner
- Use deterministic demonstration ratings
- Align module configuration with the UUID dependency

## Contributing

Open an issue describing the problem or proposed improvement. Keep pull requests focused and include the steps used to verify changes. Use sample data and keep credentials out of commits.

## Verification

This documentation was checked against the committed source files, dependency declarations, and route definitions. Installation, compilation, database setup, and runtime behavior have not been verified by this documentation update. There is no automated test suite in the current repository.
