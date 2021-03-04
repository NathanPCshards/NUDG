module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define("test", {
    idOrgWeaknesses: {
      type: Sequelize.INTERGER
    }
  });

  return Test;
};