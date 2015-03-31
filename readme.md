#Passport-demo
Basic local-login and local-signup strategies

##Use
1. ```npm install```
2. Add database info as a new file /config/database.js with 
	```module.exports = {"url": "mongodb://<YOUR-USERNAME>:<YOUR-PASSWORD>@<YOUR-MONGO-URL>/<YOUR-COLLECTION>"}```
3. For development, start with ```nodemon server.js```. Otherwise, start with ```node server.js``` or ```npm start``` 

##Angular Routing
- Uses the ```/*``` express route.
- Try it out using ```/home``` or ```/next```

##Testing
- Tests use superagent to check route changes on sign-up/login/logout
- Run tests using ```npm test``` from the command line