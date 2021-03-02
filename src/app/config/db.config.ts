module.exports = {
    HOST: "192.168.0.2",
    PORT:"3306",
    USER: "root",
    PASSWORD: "password",
    DB: "sakila",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };


