const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const User = require('../models/user');

function signUp(req, res) {
  const user = new User();

  const { name, lastname, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = 'admin';
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: 'Las contraseñas son obligatorias' });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: 'Las contraseñas no son iguales' });
    } else {
      bcrypt.hash(password, null, null, function (err, hash) {
        if (err) {
          res.status(500).send({ message: 'Error al encryptar la contraseña' });
        } else {
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: 'Usuario ya existe' });
            } else {
              if (!userStored) {
                res.status(404).send({ message: 'Error al crear el usuario' });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
      // res.status(200).send({ message: 'Usuario creado.' });
    }
  }
}
function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: 'Error del servidor' });
    } else {
      if (!userStored) {
        res.status(404).send({ message: 'Usuario no encontrado' });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: 'Error del servidor' });
          } else if (!check) {
            res.status(404).send({ message: 'La contraseña es incorrecta' });
          } else {
            if (!userStored.active) {
              res.status(200).send({ code: 200, message: 'El usuario no se ha activado.' });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccesToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored),
              });
            }
          }
        });
      }
    }
  });
}

function getUsers(req, res) {
  User.find().then((user) => {
    if (!user) {
      res.status(404).send({ message: 'No se han encontrado usuarios' });
    } else {
      res.status(200).send({ user });
    }
  });
}
function getUsersActive(req, res) {
  const query = req.query;

  User.find({ active: query.active }).then((user) => {
    if (!user) {
      res.status(404).send({ message: 'No se han encontrado usuarios' });
    } else {
      res.status(200).send({ user });
    }
  });
}
function uploadAvatar(req, res) {
  const params = req.params;
  User.findById({ _id: params.id }),
    (err, userData) => {
      if (err) {
        res.status(500).send({ message: 'Error del servidor' });
      } else {
        if (!userData) {
          res.status(404).send({ message: 'No se ha encontrado ningun usuario' });
        } else {
          let user = userData;
          if (req.files) {
            let filePath = req.files.avatar.path;
            let filesSplit = filePath.split('/');
            let fileName = filesSplit(2);
            let extSplit = fileName.split('.');
            let fileExt = extSplit[1];
            if (fileExt !== 'png' && fileExt !== 'jpg') {
              res.status(400).send({ message: 'La extension  de la imagen no es permitida' });
            }
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate({ _id: params.id }, user, (err, userResult) => {
              if (err) {
                res.status(500).send({ message: 'Error del servidor' });
              } else {
                if (!userResult) {
                  res.status(404).send({ message: 'No se ha encontrado ningun usuario' });
                } else {
                  res.status(200).send({ avatarName: fileName });
                }
              }
            });
          }
        }
      }
    };
}

function getAvatar(req, res) {
  const avatarName = req.params.avatarName;
  const filePath = '../uploads/avatar' + avatarName;

  fs.exists(filePath, (exists) => {
    if (!exist) {
      res.status(404).send({ message: 'El avatar que buscas no existe' });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

async function updateUser(req, res) {
  let userData = req.body;
  userData.email = req.body.email.toLowerCase;
  const params = req.params;

  if (userData.password) {
    await bcrypt.hash(userData.password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ message: 'Error al encriptar la contraseña' });
      } else {
        userData.password = hash;
      }
    });
  }

  User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
    if (err) {
      res.status(500).send({ message: 'Error del servidor' });
    } else {
      if (!userUpdate) {
        res.status(404).send({ message: 'No se ha encontrado el usuario' });
      } else {
        res.status(200).send({ message: 'Usuario actualizado correctamente.' });
      }
    }
  });
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActive,
  uploadAvatar,
  getAvatar,
  updateUser,
};
