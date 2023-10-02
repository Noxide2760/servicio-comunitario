const AdminController = {};
const {Admin} = require('../db/sequelize');
const response = require('../utils/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// function findOne(id_admin){
//     return Admin.findOne({
//         where: {
//             id_admin
//         },
//     });
// }

function findByUsername(username){
    return Admin.findOne({
        where: {
            username
        },
    });
}


AdminController.loginUser = (req, res) => {

    let data = req.body;

    if(data.username === undefined || data.password === undefined || 
        data.username === null || data.password === null){

        res.json(response({
            status: 'ERROR',
            msg: 'Usuario y/o Contraseña inválida'
        }));

    } else {

        findByUsername(data.username).then((user) => {
            if(user === null){
                res.json(response({
                    status: 'ERROR',
                    msg: 'Usuario y/o Contraseña inválida'
                }));
            } else {
                bcrypt.compare(data.password, user.password, (error, result) => {

                    if(result){

                        let token = jwt.sign({
                            status: true,
                            id_admin: user.id_admin,
                        }, 'secret', { algorithm: 'HS256', expiresIn: '1d'});

                        res.json(response({
                            status: 'SUCCESS',
                            msg: 'Operación Exitosa',
                            data: { token : token }
                        }));

                    } else {
                        res.json(response({
                            status: 'ERROR',
                            msg: 'Usuario y/o Contraseña inválida'
                        }));
                    }

                });

            }
        });

    }

}


AdminController.createUser = (req, res) => {

    let data = req.body;

    findByUsername(data.username).then((user) => {

        if(user === null){

            bcrypt.hash(data.password, saltRounds, (e, hash) => {

                if(e){
                    console.log(e);
                    res.json(response({
                        status: 'ERROR',
                        msg: 'Error al registrar usuario'
                    }));
                } else {
                    Admin.create({
                        username: data.username,
                        password: hash,
                    }).then((user) => {
                        res.json(response({
                            status: 'SUCCESS',
                            data:user,
                        }));
                    }).catch((e) => {
                        console.log(e);
                        res.json(response({
                            status: 'ERROR',
                            msg: 'Error al registrar usuario'
                        }));
                    });
                }

            });
            
        } else {

            res.json(response({
                status: 'ERROR',
                msg: 'Usuario ya registrado'
            })); 

        }

    });

}


module.exports = AdminController;