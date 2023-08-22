# Polling-System-API
Polling system api lets you create free polls and options to that polls so you can vote he options

Live at: https://polling-system-api-4s7c.onrender.com/

# Quick Start
1. Install all the dependent modules in package.json using:

```
npm install
```

2. Ensure mongo db is running on your system or go to (https://cloud.mongodb.com/) and log in to your account and setup your mongo db
3. Copy the connection string either of your local machine or the one you get from the website
(NOTE: Please mark your IP_ADDRESS in whitelist to continue using the db from your system)

4. Define environment variable either in .env file or editing your system environment variables and add these two

``` javascript
CONNECTION_STRING = "your_mongodb_connection_string"
PORT = "specify_the_port_on_which_you_want_to_run_your_application"
```

5.After Installing all the dependent modules. You can run the following command to run the project

```
npm start
```
6. Navigate to browser and open https://localhost:8080 (Note: you can use any port just specify that port in the environment)

# API GUIDE

Here is a quick guide on how to use the API

1. You can create polls by adding question to the polls this can be achieved using create question api route to api is ***/api/v1/questions/create***

```
Request body
{
  id: 1, //Your question ID
  title: "your_question"
}
```

2. You can add options to the question in poll using this route:  ***/api/v1/questions/:id/options/create***
```
Request body
{
  optionId: 1, //Your Option ID
  text: "your_option"
}
```
3. You can fetch a particular question by this route: ***/api/v1/questions/:id***
4. You can delete a particular question by this route: ***/api/v1/questions/:id/delete***
5. You can vote an option by using this route: ***/api/v1/options/:id/:qid/vote***
6. You can delete a particular option by using this route ***/api/v1/options/:id/:qid/delete***


## Postman collection 
You can import postman collection attached with this repository to understand it well
