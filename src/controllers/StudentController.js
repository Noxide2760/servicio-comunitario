const StudentController = {};
const {Student} = require('../db/sequelize');
const {EducationalGradeAttend} = require('../db/sequelize');
const {EducationalLevel} = require('../db/sequelize');
const {Roles} = require('../db/sequelize');
const {Gender} = require('../db/sequelize');
const {CivilStatus} = require('../db/sequelize');
const {WorkingCondition} = require('../db/sequelize');
const {IncomeLevel} = require('../db/sequelize');
const response = require('../utils/response');

function findAllEducationalGradeAttend(){
    return EducationalGradeAttend.findAll();
}

function findAllEducationLevel(){
    return EducationalLevel.findAll();
}

function findAllRoles(){
    return Roles.findAll();
}

function findAllGender(){
    return Gender.findAll();
}

function findAllCivilStatus(){
    return CivilStatus.findAll();
}

function findAllWorkingCondition(){
    return WorkingCondition.findAll();
}

function findAllIncomeLevel(){
    return IncomeLevel.findAll();
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

StudentController.getAllRoles = (req, res) => {
    findAllRoles().then(roles => {

        if(roles == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Roles no disponibles'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: roles,
            }));
        }

    })
}

StudentController.getAllGender = (req, res) => {
    findAllGender().then(gender => {

        if(gender == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Generos no disponibles'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: gender,
            }));
        }

    })
}

StudentController.getAllCivilStatus = (req, res) => {
    findAllCivilStatus().then(civilStatus => {

        if(civilStatus == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Estatus civiles no disponibles'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: civilStatus,
            }));
        }

    })
}

StudentController.getAllWorkingCondition = (req, res) => {
    findAllWorkingCondition().then(workingCondition => {

        if(workingCondition == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Condiciones laborales no disponibles'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: workingCondition,
            }));
        }

    })
}

StudentController.getAllIncomeLevel = (req, res) => {
    findAllIncomeLevel().then(incomeLevel => {

        if(incomeLevel == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Niveles de ingresos no disponibles'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: incomeLevel,
            }));
        }

    })
}

module.exports = StudentController;