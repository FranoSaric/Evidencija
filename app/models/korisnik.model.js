module.exports = (sequelize, Sequelize) => {
  const Osoba = sequelize.define("korisnik", {
    brojIndexa: {
      type: Sequelize.BIGINT,
      primaryKey: true,   
      autoIncrement: true
    },
    ime: {
      type: Sequelize.STRING
    },
    prezime: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    lozinka: {
      type: Sequelize.STRING
    }
  });

  return Osoba;
};
