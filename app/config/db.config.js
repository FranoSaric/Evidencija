module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Sarke.007",
  DB: "dbfsre",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};