//Initialize env variables
// const dotenv = require("dotenv");
// dotenv.config(); //Activate env

require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const env = process.env;

const config = {
  db: {
    /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: env.DB_CONNECTION_LIMIT,
    queueLimit: 0,
    debug: env.DB_DEBUG || false,
    port: env.DB_PORT || "3306",
  },
};

module.exports = config;
