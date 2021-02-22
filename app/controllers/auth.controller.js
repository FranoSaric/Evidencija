const db = require("../models");
const config = require("../config/auth.config");
const User = db.korisnik;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.create({
    brojIndexa: req.body.brojIndexa,
    ime: req.body.ime,
    prezime: req.body.prezime,
    email: req.body.email,
    lozinka: bcrypt.hashSync(req.body.lozinka, 8)
  }).then(user => {
    if (req.body.roles) {
      Role.findOne({
        where: {
          id: {
            [Op.eq]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRole(roles).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
      // user role = 1
      user.setRole([1]).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      brojIndexa: req.body.brojIndexa
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.lozinka,
        user.lozinka
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      
      user.getRole().then(roles => {
        res.status(200).send({
          brojIndexa: user.brojIndexa,
          ime: user.ime,
          prezime: user.prezime,
          email: user.email,
          roles: roles.naziv,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};