module.exports = {
    HOST: "192.168.0.2",
    PORT:"3306",
    USER: "Alex",
    PASSWORD: "Pcshards&6",
    DB: "sakila",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };


