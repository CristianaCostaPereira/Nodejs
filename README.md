# Nodejs
Project for ITGest Academy

Exercises from week four.
Express, body-parser installation as dependencies
Build a backend environment


- Express installation:
    1. yarn init -y
    2. yarn add express
    3. added in package.json:
        "script": {
          "dev": "node my/path"
        }
    4. const express = require ('express'), const app = express() and definition of my port in my server.js file
    5. yarn dev

- For the porpuse of not close and start the terminal everytime, install nodemon:
  1. yarn add -D nodemon;
  2. change package.json to:
      script": {
          "dev": "nodemon my/path"
      }
  3. yarn dev

- For communicate to the data base, install:
  1. yarn add mysql2

- For validation and sanitize the data, install indicative:
  1. yarn add indicative (you can check documentation in: [https://indicative.adonisjs.com/guides/master/introduction])

- Install bcrypt and jsonwebtoken by running the follow commands:
  1. yarn add bcrypt [https://www.npmjs.com/package/bcrypt]
  2. yarn add jsonwebtoken [https://www.npmjs.com/package/jsonwebtoken]

