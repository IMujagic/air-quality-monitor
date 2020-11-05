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
3. First time **start only db service** and add initial data
    - `docker-compose up air-quality-db`
    - When the container is running we need to add our inital user:
        - Open container bash: `docker container exec -it air-mongodb bash`
        - Open mongo: `mongo`
        - Switch to db `use air_quality`
        - Add user: `db.createUser({user: 'air_quality_api', pwd: YOUR_PASSWORD, roles: [{role: 'readWrite', db: 'air_quality'}]})`
        - Exit the mongo shell and container bash
    - Restore DB dump (DB dump can be found under `Src/db/dump` folder):
        - `mongorestore -h localhost:27017 __PATH_TO_PROJECT__/Src/db/dump/`
    - This will create two collections:
        - `air-quality-indexes` with 15 countries + each country has 25 measurements (subdocuments)
        - `users` with default user that can be used for login (username: test@test.com, pass: 1234aQ) 
4. When the database is populated **stop the container** (**Do not delete the container because no volume is configured**)
5. Set ENV vars and run all services:`sudo JWT_SECRET="" DB_USER="air_quality_api" DB_PASS="" docker-compose up -d` :
    - Frontend will http://localhost:8081 (***Use pre-defined demo username: `test@test.com` and password: `1234aQ`***)
    - Backend http://localhost:3000
    - Both parts, frontend and backend, support configuration with ENV vars (provided with docker-compose).