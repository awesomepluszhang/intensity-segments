# Intensity Segments
This project implements a basic management system for intensity segments. The system allows you to:

Manage intensity over segments, represented by intervals from negative infinity to positive infinity.
Add intensity by a specific integer amount within a given range.
Set intensity to a specific value for a given range.

## Setup and Development

### Installation
Install dependencies by running: `npm install`

### Running the Project
Development: To start the development server with hot loading, run: `npm run dev`
Production: For production, build and start the project with: `npm run build && npm run start`

### Testing
Unit tests are written using Jest to ensure the functionality of intensity segments. You can run tests using: `npm run test`

### Linting
Make sure to check for lint errors before committing your changes by running: `npm run lint` or `npm run lint:fix` with automatic fixing.
To ensure that lint checks are passed for each commit, Husky has been integrated to prevent commits with errors.
