1. Start Mongo in container
`docker container run --name mongodb_local --publish 27020:27017 -d mongo:latest`

2. Connect to Mongo container
`docker container exec -it mongoc bash`

3. Open Mongo shell:
`mongo`

4. Add default user
bash```
    use air_quality
    db.createUser({user: 'air_quality_api', pwd: ads_password, roles: [{role: 'readWrite', db: 'air_quality'}]})
```