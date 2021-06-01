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
