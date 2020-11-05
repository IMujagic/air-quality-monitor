Small Ionic PWA app with NestJS/MongoDB backend

## Main features:

1. Registration and Login (JWT)
2. List of air quality measurements by user city (part of the user profile)
3. List of all air quality measurements by country/city (desc sort by air quality index)
4. PWA support
5. List infinite scroll

## User flow

1. Create account (all fields are required - city will be used for filtering)
2. Login
3. Home page shows two tabs:
    - My list: This is the list of measurements filtered by city name from user profile (see step 1)
    - All: This is the list of all measurements grouped by country/city and sorted by index


## Run instructions

Project supports docker and it can be started using `docker-compose`:

1. `cd Src/`
2. `docker-compose build`
3. Set env vars and run the project:`sudo JWT_SECRET="" DB_USER="" DB_PASS="" docker-compose up` :
    - Frontend will http://localhost:8081
    - Backend http://localhost:3000
    - Both parts, frontend and backend, support configuration with ENV vars (provided with docker-compose).
4. When everything is up and running restore the MongoDB dump:
    - DB dump can be found under `Src/db/dump` folder
    - Restore dump using mongorestore tool: `mongorestore -h localhost:27017 __PATH_TO_PROJECT__/Src/db/dump/ `
5. This will create two collections:
    - `air-quality-indexes` with 15 countries + each country has 25 measurements (subdocuments)
    - `users` with default user that can be used for login (username: test@test.com, pass: 1234aQ) 