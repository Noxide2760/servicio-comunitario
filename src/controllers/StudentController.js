const StudentController = {};
const { json } = require('express/lib/response');
const {Student} = require('../db/sequelize');
const {LegalRepresentative} = require('../db/sequelize');
const {Parents} = require('../db/sequelize');
const {EmergencyPerson} = require('../db/sequelize');
const {EducationalGradeAttend} = require('../db/sequelize');
const {EducationalLevel} = require('../db/sequelize');
const {Roles} = require('../db/sequelize');
const {Gender} = require('../db/sequelize');
const {CivilStatus} = require('../db/sequelize');
const {WorkingCondition} = require('../db/sequelize');
const {IncomeLevel} = require('../db/sequelize');
const {HousingStudent} = require('../db/sequelize');
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


StudentController.saveStudentInformation = (req, res) => {

    let data = req.body;

    LegalRepresentative.create(data.LegalRepresentativeEntity).then(legalRepresentative => {

        if(legalRepresentative == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Error al salvar informacion del representante legal'
            }));
        }

        Parents.create(data.MotherEntity).then(mother => {
            if(mother == null){
                res.json(response({
                    status: 'ERROR',
                    msg: 'Error al salvar informacion de la madre'
                }));
            }

            Parents.create(data.FatherEntity).then(father => {
                if(father == null){
                    res.json(response({
                        status: 'ERROR',
                        msg: 'Error al salvar informacion de la padre'
                    }));
                }

                data.StudentEntity.id_legal_representative = legalRepresentative.id_legal_representative;
                data.StudentEntity.id_mother = mother.id_parents;
                data.StudentEntity.id_father = father.id_parents;
        
                Student.create(data.StudentEntity).then(student => {
        
                    if(student == null){
                        res.json(response({
                            status: 'ERROR',
                            msg: 'Error al salvar informacion del estudiante'
                        }));
                    }

                    data.EmergencyPersonEntity.id_student = student.id_student;

                    EmergencyPerson.create(data.EmergencyPersonEntity).then(emergencyPerson => {

                        if(emergencyPerson == null){
                            res.json(response({
                                status: 'ERROR',
                                msg: 'Error al salvar informacion de la persona de emergencia'
                            }));
                        }

                    }).then(() => {
                        console.log(`Registro creado de la persona de emergencia`);
                        }).catch((error) => {
                        console.error(`Error al crear el registro de la persona de emergencia`, error);
                        });

                    const answersData = data.AnswerEntity;

                    for (const questionIdStr in answersData) {

                        const questionId = parseInt(questionIdStr);
                        const answerId = answersData[questionId];
                      
                        HousingStudent.create({
                          id_student: student.id_student,
                          id_housing_question: questionId,
                          id_housing_answer: answerId,
                        }).then(() => {
                          console.log(`Registro creado para pregunta ${questionId}`);
                        }).catch((error) => {
                          console.error(`Error al crear el registro para pregunta ${questionId}:`, error);
                        });

                    }
                
                });

            }).then(() => {
                console.log(`Registro creado del padre`);
              }).catch((error) => {
                console.error(`Error al crear el registro del padre`, error);
              });

        }).then(() => {
            console.log(`Registro creado de la madre`);
          }).catch((error) => {
            console.error(`Error al crear el registro de la madre`, error);
          });

    }).then(() => {

        console.log(`Registro creado del representante legal`);

        res.json(response({
            status: 'SUCCESS',
            msg: 'Informacion registrada correctamente',
        }));

      }).catch((error) => {
        console.error(`Error al crear el registro del representante legal`, error);

        res.json(response({
            status: 'ERROR',
            msg: 'Error al crear el registro del representante legal',
        }));
      });

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

    });
}

StudentController.getTest = (req, res) => {

    let data = req.body;
    
    const answersData = data.AnswerEntity;

    for (const questionIdStr in answersData) {

        const questionId = parseInt(questionIdStr);
        const answerId = answersData[questionId];
        
        HousingStudent.create({
            id_student: 1,
            id_housing_question: questionId,
            id_housing_answer: answerId,
        }).then(() => {
            console.log(`Registro creado para pregunta ${questionId}`);
        }).catch((error) => {
            console.error(`Error al crear el registro para pregunta ${questionId}:`, error);
        });
        
    }

    res.json(response({
        status: 'SUCCESS',
        msg: 'Todas las respuestas fueron salvadas correctamente.',
    }));

}

module.exports = StudentController;