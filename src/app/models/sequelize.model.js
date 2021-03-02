

module.exports = (sequelize, Sequelize, DataTypes) => {
    const actorTable = sequelize.define('actor', {
      
      
      actor_id: {
        type: Sequelize.INTEGER,
        
       // field: 'actor_id'
      },
      first_name: {
        type: Sequelize.STRING,
       // field: 'first_name',
      },
      last_name: {
        type: Sequelize.STRING,
       // field: 'last_name',
      },
    
    

    });
  
    return actorTable;
  };
  
  

 // const { Sequelize, DataTypes } = require('sequelize');


/*
console.log('sequelize model');
module.exports = (sequelize, DataTypes)=> {
  
  const actorTable = sequelize.define('actor', {
    actor_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    last_update: DataTypes.DATEONLY
  },
  {},);
  actorTable.associate = function (models){
    //fill this in later
  };
  return actorTable;
}
*/