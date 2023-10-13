const StudentController = {};
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
const {StudentHealthInformation} = require('../db/sequelize');
const {PrenatalHistoryAtBirth} = require('../db/sequelize');
const {TypeOfBirth} = require('../db/sequelize');
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

function findAllPrenatalHistoryAtBirth(){
    return PrenatalHistoryAtBirth.findAll();
}

function findAllTypeOfBirth(){
    return TypeOfBirth.findAll();
}

function findStudentEntityBySchool_document(school_document){
    return Student.findOne({
        where: {
            school_document
        },
    });
}

function findLegalRepresentativeByIdentificationDocument(identification_document){
    return LegalRepresentative.findOne({
        where: {
            identification_document
        },
    });
}

function findParentByIdentificationDocument(identification_document){
    return Parents.findOne({
        where: {
            identification_document
        },
    });
}

function findEmergencyPersonByIdentificationDocument(identification_document){
    return EmergencyPerson.findOne({
        where: {
            identification_document
        },
    });
}

function findStudentHealthInformationByIdStudent(id_student){
    return StudentHealthInformation.findOne({
        where: {
            id_student
        },
    });
}


StudentController.saveStudentInformation = (req, res) => {

    let data = req.body;
    let legalEntity;

    findStudentEntityBySchool_document(
        data.StudentEntity.school_document).then(studentExist => {

        if(!studentExist) {

            findLegalRepresentativeByIdentificationDocument(
                data.LegalRepresentativeEntity.identification_document).then(legalRepresentativeExist => {

                    if(!legalRepresentativeExist) {

                        LegalRepresentative.create(data.LegalRepresentativeEntity).then(legalRepresentative => {

                            if(legalRepresentative == null){
                                res.json(response({
                                    status: 'ERROR',
                                    msg: 'Error al salvar informacion del representante legal'
                                }));
                            }

                            legalEntity = legalRepresentative;

                        }).then(() => {
                    
                            console.log(`Registro creado del representante legal`);
                    
                          }).catch((error) => {
                                console.error(`Error al crear el registro del representante legal`, error);
                        
                                res.json(response({
                                    status: 'ERROR',
                                    msg: 'Error al crear el registro del representante legal',
                                }));
                            });

                            } else { // Si el representante legal ya esta registrado

                                legalEntity = legalRepresentativeExist;
                                console.log(`Representante legal ya registrado`);

                            }

                            // Si estudiante tiene Madre
                            if(data.MotherEntity != null){

                                Parents.create(data.MotherEntity).then(mother => {
                                    if(mother == null){
                                        res.json(response({
                                            status: 'ERROR',
                                            msg: 'Error al salvar informacion de la madre'
                                        }));
                                    }

                                    // Si estudiante tiene Padre
                                    if(data.FatherEntity != null){

                                        Parents.create(data.FatherEntity).then(father => {
                                            if(father == null){
                                                res.json(response({
                                                    status: 'ERROR',
                                                    msg: 'Error al salvar informacion de la padre'
                                                }));
                                            }
                            
                                            data.StudentEntity.id_legal_representative = legalEntity.id_legal_representative;
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
        
                                                StudentHealthInformation.create(data.StudentHealthInformationEntity)
                                                .then(studentHealthInformation => {
        
                                                    if(studentHealthInformation == null){
                                                        res.json(response({
                                                            status: 'ERROR',
                                                            msg: 'Error al salvar la informacion de salud del estudiante'
                                                        }));
                                                    }
        
                                                }).then(() => {
                                                    console.log(`Registro creado de la informacion de salud del estudiante`);
                                                    }).catch((error) => {
                                                    console.error(`Error al crear la informacion de salud del estudiante`, error);
                                                    });
                                            
                                            }).then(() => {
                                                console.log(`Registro creado del estudiante`);
                                              }).catch((error) => {
                                                console.error(`Error al crear el registro del estudiante`, error);
                                              });
                            
                                        }).then(() => {
                                            console.log(`Registro creado del padre`);
                                          }).catch((error) => {
                                            console.error(`Error al crear el registro del padre`, error);
                                          });

                                    } else { // El estudiante no tiene padre pero SI madre

                                        Parents.create(data.MotherEntity).then(mother => {

                                            if(mother == null){
                                                res.json(response({
                                                    status: 'ERROR',
                                                    msg: 'Error al salvar informacion de la madre'
                                                }));
                                            }

                                            data.StudentEntity.id_legal_representative = legalEntity.id_legal_representative;
                                            data.StudentEntity.id_mother = mother.id_parents;
                                            data.StudentEntity.id_father = null;
                                    
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
        
                                                StudentHealthInformation.create(data.StudentHealthInformationEntity)
                                                .then(studentHealthInformation => {
        
                                                    if(studentHealthInformation == null){
                                                        res.json(response({
                                                            status: 'ERROR',
                                                            msg: 'Error al salvar la informacion de salud del estudiante'
                                                        }));
                                                    }
        
                                                }).then(() => {
                                                    console.log(`Registro creado de la informacion de salud del estudiante`);
                                                    }).catch((error) => {
                                                    console.error(`Error al crear la informacion de salud del estudiante`, error);
                                                    });
                                            
                                            }).then(() => {
                                                console.log(`Registro creado del estudiante`);
                                              }).catch((error) => {
                                                console.error(`Error al crear el registro del estudiante`, error);
                                              });

                                        }).then(() => {
                                            console.log(`Registro creado de la madre`);
                                          }).catch((error) => {
                                            console.error(`Error al crear el registro de la madre`, error);
                                          });

                                    }
                        
                                }).then(() => {
                                    console.log(`Registro creado de la madre`);
                                  }).catch((error) => {
                                    console.error(`Error al crear el registro de la madre`, error);
                                  });

                            } else { // Si estudiante NO tiene Madre

                                // Si el estudiante NO tiene madre pero SI padre
                                if(data.FatherEntity != null){

                                    Parents.create(data.FatherEntity).then(father => {
                                        if(father == null){
                                            res.json(response({
                                                status: 'ERROR',
                                                msg: 'Error al salvar informacion de la padre'
                                            }));
                                        }
                        
                                        data.StudentEntity.id_legal_representative = legalEntity.id_legal_representative;
                                        data.StudentEntity.id_mother = null;
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
    
                                            StudentHealthInformation.create(data.StudentHealthInformationEntity)
                                            .then(studentHealthInformation => {
    
                                                if(studentHealthInformation == null){
                                                    res.json(response({
                                                        status: 'ERROR',
                                                        msg: 'Error al salvar la informacion de salud del estudiante'
                                                    }));
                                                }
    
                                            }).then(() => {
                                                console.log(`Registro creado de la informacion de salud del estudiante`);
                                                }).catch((error) => {
                                                console.error(`Error al crear la informacion de salud del estudiante`, error);
                                                });
                                        
                                        });
                        
                                    }).then(() => {
                                        console.log(`Registro creado del padre`);
                                      }).catch((error) => {
                                        console.error(`Error al crear el registro del padre`, error);
                                      });

                                } else { //El estudiante no tiene madre ni padre

                                    data.StudentEntity.id_legal_representative = legalEntity.id_legal_representative;
                                    data.StudentEntity.id_mother = null;
                                    data.StudentEntity.id_father = null;
                            
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

                                        StudentHealthInformation.create(data.StudentHealthInformationEntity)
                                        .then(studentHealthInformation => {

                                            if(studentHealthInformation == null){
                                                res.json(response({
                                                    status: 'ERROR',
                                                    msg: 'Error al salvar la informacion de salud del estudiante'
                                                }));
                                            }

                                        }).then(() => {
                                            console.log(`Registro creado de la informacion de salud del estudiante`);
                                            }).catch((error) => {
                                            console.error(`Error al crear la informacion de salud del estudiante`, error);
                                            });
                                    
                                    }).then(() => {
                                        console.log(`Registro creado del estudiante`);
                                      }).catch((error) => {
                                        console.error(`Error al crear el registro del estudiante`, error);
                                      });

                                }

                            }

                });

        } else { // Reinscripción

            findLegalRepresentativeByIdentificationDocument
            (data.LegalRepresentativeEntity.identification_document).then(legalRepresentative => {

                legalRepresentative = data.LegalRepresentativeEntity;
                LegalRepresentative.update(legalRepresentative);

            }).then(() => {
            console.log(`Informacion del representante legal del estudiante ${studentExist.school_document} actualizada!`);
            }).catch((error) => {
            console.error(`Error al actualizar la informacion del representante legal del estudiante ${studentExist.school_document}`, error);
            });

            // Si tiene madre actualizamos los datos
            if(data.StudentEntity.has_mother){
                findParentByIdentificationDocument
                (data.MotherEntity.identification_document).then(motherEntity => {

                    motherEntity = data.MotherEntity;
                    Parents.update(motherEntity);

                }).then(() => {
                console.log(`Informacion de la madre del estudiante ${studentExist.school_document} actualizada!`);
                }).catch((error) => {
                console.error(`Error al actualizar la informacion de la madre del estudiante ${studentExist.school_document}`, error);
                });
            }

            // Si tiene padre actualizamos los datos
            if(data.StudentEntity.has_father){
                findParentByIdentificationDocument
                (data.FatherEntity.identification_document).then(fatherEntity => {

                    fatherEntity = data.FatherEntity;
                    Parents.update(fatherEntity);

                }).then(() => {
                console.log(`Informacion del padre del estudiante ${studentExist.school_document} actualizada!`);
                }).catch((error) => {
                console.error(`Error al actualizar la informacion del padre del estudiante ${studentExist.school_document}`, error);
                });
            }

            // Actualizamos  los datos del estudiante
            findStudentEntityBySchool_document(data.StudentEntity.school_document).then(student => {

                student = data.StudentEntity;
                Student.update(student);

            }).then(() => {
            console.log(`Informacion del estudiante actualizada!`);
            }).catch((error) => {
            console.error(`Error al actualizar la informacion del estudiante`, error);
            });

            // Actualizamos los datos de la persona de emergencia
            findEmergencyPersonByIdentificationDocument
            (data.EmergencyPersonEntity.identification_document).then(emergencyPerson => {

                emergencyPerson = data.EmergencyPersonEntity;
                EmergencyPerson.update(emergencyPerson);

            }).then(() => {
            console.log(`Informacion de la persona de emergencia actualizada!`);
            }).catch((error) => {
            console.error(`Error al actualizar la informacion de la persona de emergencia`, error);
            });

            const housingData = data.HousingStudentEntity;

            // Actualizamos las respuestas de la vivienda
            housingData.forEach((housing) => {
                HousingStudent.update(housing);
            });

            // Actualizamos la informacion de salud del estudiante
            findStudentHealthInformationByIdStudent
            (studentExist.id_student).then(studentHealthInformation => {

                studentHealthInformation = data.StudentHealthInformationEntity;
                StudentHealthInformation.update(studentHealthInformation);

            }).then(() => {
            console.log(`Informacion de salud del estudiante actualizada!`);
            }).catch((error) => {
            console.error(`Error al actualizar la informacion de salud del estudiante`, error);
            });

        }

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

StudentController.getAllPrenatalHistoryAtBirth = (req, res) => {
    findAllPrenatalHistoryAtBirth().then(prenatalHistoryAtBirth => {

        if(prenatalHistoryAtBirth == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Historia prenatal al nacer no disponibles'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: prenatalHistoryAtBirth,
            }));
        }

    });
}

StudentController.getAllTypeOfBirth = (req, res) => {
    findAllTypeOfBirth().then(typeOfBirth => {

        if(typeOfBirth == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Tipos de nacimientos no disponibles'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: typeOfBirth,
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