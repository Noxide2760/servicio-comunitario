const StudentController = {};
const {Student} = require('../db/sequelize');
const {EducationalGradeAttend} = require('../db/sequelize');
const {EducationalLevel} = require('../db/sequelize');
const response = require('../utils/response');

function findAllEducationalGradeAttend(){
    return EducationalGradeAttend.findAll();
}

function findAllEducationLevel(){
    return EducationalLevel.findAll();
}

StudentController.getAllEducationalGradeAttend = (req, res) => {
    findAllEducationalGradeAttend().then(educationalGradeAttend => {

        if(educationalGradeAttend == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Niveles educativos a cursar no disponibles'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: educationalGradeAttend,
            }));
        }

    })
}

StudentController.getAllEducationalLevel = (req, res) => {
    findAllEducationLevel().then(educationalLevel => {

        if(educationalLevel == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Niveles educativos no disponibles'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: educationalLevel,
            }));
        }

    })
}

module.exports = StudentController;