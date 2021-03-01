module.exports = (sequelize, Sequelize) => {
    const actorTable = sequelize.define("actor", {
      
      
      first_name: {
        type: Sequelize.STRING,
        field: 'first_name'
      },
      last_name: {
        type: Sequelize.STRING,
        field: 'last_name',
      },

    });
  
    return actorTable;
  };