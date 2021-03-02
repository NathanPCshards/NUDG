module.exports = (sequelize, Sequelize) => {
    const Actor = sequelize.define("actor", {
      actor_id: {
        type: Sequelize.INTEGER
      },
     
    });
  
    return Actor;
  };

