module.exports = (sequelize, Sequelize) => {
    const Evidencija = sequelize.define("evidencija", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    });
  
    return Evidencija;
  };