module.exports = (sequelize, Sequelize) => {
    const Kolegij = sequelize.define("kolegiji", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      naziv: {
        type: Sequelize.STRING
      },
      akGod: {
        type: Sequelize.DATE
      }
    });
  
    return Kolegij;
  };