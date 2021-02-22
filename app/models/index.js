const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    omitNull: true,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.kolegiji = require("../models/kolegiji.model.js")(sequelize, Sequelize);
db.korisnik = require("./korisnik.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.studiji = require("../models/studiji.model.js")(sequelize, Sequelize);
db.termini = require("../models/termini.model.js")(sequelize, Sequelize);
db.ucionica = require("../models/ucionica.model.js")(sequelize, Sequelize);
db.evidencija = require("../models/evidencija.model.js")(sequelize, Sequelize);

db.role.hasMany(db.korisnik, {foreignKey: 'ulogaFK', sourceKey: 'id'});
db.korisnik.belongsTo(db.role, {foreignKey: 'ulogaFK', targetKey: 'id'});

db.studiji.hasMany(db.kolegiji, {foreignKey: 'studijiFK', sourceKey: 'id'});
db.kolegiji.belongsTo(db.studiji, {foreignKey: 'studijiFK', targetKey: 'id'});

db.korisnik.hasMany(db.kolegiji, {foreignKey: 'osobljeFK', sourceKey: 'brojIndexa'});
db.kolegiji.belongsTo(db.korisnik, {foreignKey: 'osobljeFK', targetKey: 'brojIndexa'});

db.studiji.hasMany(db.termini, {foreignKey: 'studijiFK', sourceKey: 'id'});
db.termini.belongsTo(db.studiji, {foreignKey: 'studijiFK', targetKey: 'id'});

db.ucionica.hasMany(db.termini, {foreignKey: 'ucionicaFK', sourceKey: 'id'});
db.termini.belongsTo(db.ucionica, {foreignKey: 'studijiFK', targetKey: 'id'});

db.termini.hasMany(db.evidencija, {foreignKey: 'terminiFK', sourceKey: 'id'});
db.evidencija.belongsTo(db.termini, {foreignKey: 'terminiFK', targetKey: 'id'});

db.korisnik.hasMany(db.evidencija, {foreignKey: 'osobaFK', sourceKey: 'brojIndexa'});
db.evidencija.belongsTo(db.korisnik, {foreignKey: 'osobaFK', targetKey: 'brojIndexa'});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;