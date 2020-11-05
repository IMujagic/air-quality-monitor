## Project architecture

This project has 3 parts:

1. Frontend Ionic-App (supports PWA and it can be easily compiled as native app for Android or iOS)
2. Rest Api built using NestJS framework
3. MongoDB as a database

## Database schema

- Data is stored in MongoDB in a `airqualityindexes` collection. 
- Every country has its own document and measurements as a subdocuments.
- Sample:
```json
{
	"country" : "br",
	"population" : 23432424233,
	"measurements" : [
		{
			"city" : "Sao Paolo",
			"index" : 1,
			"measuredOn" : "2020-11-04T20:48:56.762+01:00"
		},
		{
			"city" : "Sao Paolo",
			"index" : 34,
			"measuredOn" : "2020-11-04T20:48:56.762+01:00"
		},
		{
			"city" : "Sao Paolo",
			"index" : 3,
			"measuredOn" : "2020-11-04T20:48:56.762+01:00"
		},
```
- For storing user profiles (registrations) there is another collection `users`

## Rest API

Rest Api has following endpoints:

1. `/users`
    - Allows only user registration by sending POST request (see postman-collection for an request exmaple)
2. `air-quality-indexes` ***access only with valid JWT token***
    - Supports two query parameters `page` and `city`. 
    - `page` parameters is required and it's used for paging
    - `city` parameter is optional - if set, results will be filtered by the provided city
3. `auth/login` - authentication enpoint (obtaining JWT access_token)
4. Rest API allows only one endpoint which can be set using `ALLOW_ORIGIN` env variable (see `docker-compose.yml`) 


## Frontend

Frontend part is built using Ionic Framework (type: Angular).
Project has following Angular modules:

1. `app` main/root module
1. `auth` all authentication/registration related pages
2. `home` lists the measurements - ***protected - only authenticated users can see this module***
3. Frontend and Backend exchange data in a `JSON` format over HTTP protocol

## Basic architecture diagram

![alt text](./Docs/basic-diagram.png?raw=true)

