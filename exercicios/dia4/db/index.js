const mysql = require('mysql2')

const config = require('./config')

let connection

module.db = connection

module.exports = {
  start(callback) {
    connection = mysql.createConnection(config)

    if (callback) {
      callback(connection)
    }
  }
}