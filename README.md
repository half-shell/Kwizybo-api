# Kwizybo-api
## Instructions

    1. ~ cd into directory
    2. npm install
    3. Source the .sql file
    3. node server.js
    4. Testing it running http://localhost:8080/api/posts

## To Do and more

* Routes should be listed in a dedicated route directory so it doesn't get really quickly messy.
* Instead of listing models manually, it would be better to get all files in the models/ directory (excluding index.js, naturally).
* There is only one table posts. Relations between others should be done with sequelize in the ./models/index.js.
* Better error handling should be done (in particulary reagarding empty sequelize query).
