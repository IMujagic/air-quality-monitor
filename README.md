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

