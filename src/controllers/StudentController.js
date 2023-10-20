const StudentController = {};
const {Student, AcademicLevel} = require('../db/sequelize');
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

        include: [
        {
            model: EducationalGradeAttend,
            as: 'EducationalGradeAttendEntity',
        },
        {
            model: Roles,
            as: 'RoleEconomicRepresentative',
        },
        {
            model: Gender,
            as: 'GenderEntity',
        },
        {
            model: EducationalLevel,
            as: 'EducationalLevelEntity',
        },
        {
            model: EmergencyPerson,
            as: 'EmergencyPersonEntity',
        },
        {
            model: LegalRepresentative,
            as: 'LegalRepresentativeEntity',
            include: [
            { model: Gender, as: 'GenderEntity'},
            { model: CivilStatus, as: 'CivilStatusEntity'},
            { model: AcademicLevel, as: 'AcademicLevelEntity'},
            { model: WorkingCondition, as: 'WorkingConditionEntity'},
            { model: IncomeLevel, as: 'IncomeLevelEntity'},
            { model: Roles, as: 'RolesEntity'}]
        },
        {
            model: Parents,
            as: 'FatherEntity',
            include: [
            { model: Gender, as: 'GenderEntity'},
            { model: CivilStatus, as: 'CivilStatusEntity'},
            { model: AcademicLevel, as: 'AcademicLevelEntity'},
            { model: WorkingCondition, as: 'WorkingConditionEntity'},
            { model: IncomeLevel, as: 'IncomeLevelEntity'},
            { model: Roles, as: 'RolesEntity'}]
        },
        {
            model: Parents,
            as: 'MotherEntity',
            include: [
            { model: Gender, as: 'GenderEntity'},
            { model: CivilStatus, as: 'CivilStatusEntity'},
            { model: AcademicLevel, as: 'AcademicLevelEntity'},
            { model: WorkingCondition, as: 'WorkingConditionEntity'},
            { model: IncomeLevel, as: 'IncomeLevelEntity'},
            { model: Roles, as: 'RolesEntity'}
            ]
        }],

        attributes: {
            exclude: ['id_legal_representative', 'id_gender', 'id_educational_level', 
            'id_role_economic_representative', 'id_educational_grade_attend', 'id_mother', 'id_father',
            'id_emergency_person']
        }
    });
}

function findAllStudents() {
    return Student.findAll({
      attributes: ['names', 'last_names', 'school_document', 'age'],

      include: [
            {
            model: LegalRepresentative,
            as: 'LegalRepresentativeEntity',
            },
        ],
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

function findEmergencyPersonByPhoneNumber(phone_number){
    return EmergencyPerson.findOne({
        where: {
            phone_number
        },
    });
}

function findStudentHealthInformationByIdStudent(id_student){
    return StudentHealthInformation.findOne({
        where: {
            id_student
        },

        include: [
            { model: TypeOfBirth, as: 'TypeOfBirthEntity' },
            { model: PrenatalHistoryAtBirth, as: 'PrenatalHistoryAtBirthEntity' }
        ],

        attributes: {
            exclude: ['id_type_of_birth', 'id_prenatal_history_at_birth']
        }
    });
}

function findAllHousingStudentByIdStudent(id_student){
    return HousingStudent.findAll({
        where: {
            id_student
        },

        order: [['id_housing_question', 'ASC']]
    });
}


StudentController.saveStudentInformation = (req, res) => {

    let data = req.body;
    let legalEntity;
    let emergencyEntity;

    findStudentEntityBySchool_document(
        data.StudentEntity.school_document).then(studentExist => {

        // Inscripcion
        if(!studentExist) {

            findLegalRepresentativeByIdentificationDocument(
                data.LegalRepresentativeEntity.identification_document).then(legalRepresentativeExist => {

                    if(!legalRepresentativeExist) {

                        LegalRepresentative.create(data.LegalRepresentativeEntity).then(legalRepresentative => {

                            legalEntity = legalRepresentative;
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

                            // Si estudiante tiene Padre
                            if(data.FatherEntity != null){

                                Parents.create(data.FatherEntity).then(father => {

                                    findEmergencyPersonByPhoneNumber
                                    (data.EmergencyPersonEntity.phone_number).then(async (emergencyPerson) => {

                                        if(emergencyPerson){
                                            emergencyEntity = emergencyPerson;

                                        } else {

                                            try {
                                                let emergencyPerson = await EmergencyPerson.create(data.EmergencyPersonEntity);

                                                if(emergencyPerson == null){
                                                    res.json(response({
                                                        status: 'ERROR',
                                                        msg: 'Error al salvar informacion de la persona de emergencia'
                                                    }));
                                                } else {
                                                    emergencyEntity = emergencyPerson;
                                                }
                                            } catch (e) {
                                                console.log('Error al salvar informacion de la persona de emergencia'+e);
                                                res.json(response({
                                                    status: 'ERROR',
                                                    msg: 'Error al salvar informacion de la persona de emergencia'
                                                }));
                                            }

                                        }

                                        data.StudentEntity.id_legal_representative = legalEntity.id_legal_representative;
                                        data.StudentEntity.id_mother = mother.id_parents;
                                        data.StudentEntity.id_father = father.id_parents;
                                        data.StudentEntity.id_emergency_person = emergencyEntity.id_emergency_person;
                            
                                        Student.create(data.StudentEntity).then(student => {
                        
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

                                                console.log(`Toda la informacion de la planilla fue registrada con exito!`);
                                                res.json(response({
                                                status: 'SUCCESS',
                                                msg: 'Toda la informacion de la planilla fue registrada con exito!'
                                                }));

                                            }).catch((error) => {
                                                console.error(`Error al crear la informacion de salud del estudiante`, error);
                                                res.json(response({
                                                    status: 'ERROR',
                                                    msg: `Error al crear la informacion de salud del estudiante`
                                                }));
                                            });
                                    
                                        }).catch((error) => {
                                            console.error(`Error al crear el registro del estudiante`, error);
                                            res.json(response({
                                                status: 'ERROR',
                                                msg: `Error al crear el registro del estudiante`
                                            }));
                                        });

                                    });

                                }).catch((error) => {
                                    console.error(`Error al crear el registro del padre`, error);
                                    res.json(response({
                                        status: 'ERROR',
                                        msg: `Error al crear el registro del padre`
                                    }));
                                });

                            } else { // El estudiante no tiene padre pero SI madre

                                    findEmergencyPersonByPhoneNumber
                                    (data.EmergencyPersonEntity.phone_number).then(async (emergencyPerson) => {

                                        if(emergencyPerson){
                                            emergencyEntity = emergencyPerson;
                                        } else {

                                            try {
                                                let emergencyPerson = await EmergencyPerson.create(data.EmergencyPersonEntity);

                                                if(emergencyPerson == null){
                                                    res.json(response({
                                                        status: 'ERROR',
                                                        msg: 'Error al salvar informacion de la persona de emergencia'
                                                    }));
                                                } else {
                                                    emergencyEntity = emergencyPerson;
                                                }
                                            } catch (e) {
                                                res.json(response({
                                                    status: 'ERROR',
                                                    msg: 'Error al salvar informacion de la persona de emergencia'+e
                                                }));
                                            }

                                            data.StudentEntity.id_legal_representative = legalEntity.id_legal_representative;
                                            data.StudentEntity.id_mother = mother.id_parents;
                                            data.StudentEntity.id_father = null;
                                            data.EmergencyPersonEntity.id_emergency_person = emergencyEntity.id_emergency_person;

                                            Student.create(data.StudentEntity).then(student => {
                            
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

                                                data.StudentHealthInformationEntity.id_student = student.id_student;
        
                                                StudentHealthInformation.create(data.StudentHealthInformationEntity)
                                                .then(studentHealthInformation => {
        
                                                    console.log(`Toda la informacion de la planilla fue registrada con exito!`);
                                                    res.json(response({
                                                        status: 'SUCCESS',
                                                        msg: 'Toda la informacion de la planilla fue registrada con exito!'
                                                    }));
        
                                                }).catch((error) => {
                                                console.error(`Error al crear la informacion de salud del estudiante`, error);
                                                });

                                                console.log(`Registro creado del estudiante`);

                                            }).catch((error) => {
                                            console.error(`Error al crear el registro del estudiante`, error);
                                            });

                                        }

                                    });

                            }
                
                        }).catch((error) => {
                            console.error(`Error al crear el registro de la madre`, error);
                        });

                    } else { // Si estudiante NO tiene Madre

                        // Si el estudiante NO tiene madre pero SI padre
                        if(data.FatherEntity != null){

                            Parents.create(data.FatherEntity).then(father => {

                                findEmergencyPersonByPhoneNumber
                                    (data.EmergencyPersonEntity.phone_number).then(async (emergencyPerson) => {

                                        if(emergencyPerson){

                                            emergencyEntity = emergencyPerson;

                                        } else {

                                            try {
                                                let emergencyPerson = await EmergencyPerson.create(data.EmergencyPersonEntity);

                                                if(emergencyPerson == null){
                                                    res.json(response({
                                                        status: 'ERROR',
                                                        msg: 'Error al salvar informacion de la persona de emergencia'
                                                    }));
                                                } else {
                                                    emergencyEntity = emergencyPerson;
                                                }
                                            } catch (e) {
                                                res.json(response({
                                                    status: 'ERROR',
                                                    msg: 'Error al salvar informacion de la persona de emergencia'+e
                                                }));
                                            }

                                            data.StudentEntity.id_legal_representative = legalEntity.id_legal_representative;
                                            data.StudentEntity.id_mother = null;
                                            data.StudentEntity.id_father = father.id_parents;
                                            data.EmergencyPersonEntity.id_emergency_person = emergencyEntity.id_emergency_person;
                                    
                                            Student.create(data.StudentEntity).then(student => {
                            
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
        
                                                data.StudentHealthInformationEntity.id_student = student.id_student;
        
                                                StudentHealthInformation.create(data.StudentHealthInformationEntity)
                                                .then(studentHealthInformation => {
    
                                                    console.log(`Toda la informacion de la planilla fue registrada con exito!`);
                                                    res.json(response({
                                                        status: 'SUCCESS',
                                                        msg: 'Toda la informacion de la planilla fue registrada con exito!'
                                                    }));
    
                                                }).catch((error) => {
                                                console.error(`Error al crear la informacion de salud del estudiante`, error);
                                                });
                                            
                                            }).catch((error) => {
                                                console.error(`Error al crear el registro del estudiante`, error);
                                            });

                                        }

                                    }).catch((error) => {
                                        console.error(`Error al crear el registro de la persona de emergencia`, error);
                                        res.json(response({
                                            status: 'ERROR',
                                            msg: `Error al crear el registro de la persona de emergencia`
                                        }));
                                    });
                
                            }).catch((error) => {
                                console.error(`Error al crear el registro del padre`, error);
                                res.json(response({
                                    status: 'ERROR',
                                    msg: `Error al crear el registro del padre`
                                }));
                            });

                        } else { //El estudiante no tiene madre ni padre

                            findEmergencyPersonByPhoneNumber
                                    (data.EmergencyPersonEntity.phone_number).then(async (emergencyPerson) => {

                                        if(emergencyPerson){
                                            emergencyEntity = emergencyPerson;
                                        } else {

                                            try {
                                                let emergencyPerson = await EmergencyPerson.create(data.EmergencyPersonEntity);

                                                if(emergencyPerson == null){
                                                    res.json(response({
                                                        status: 'ERROR',
                                                        msg: 'Error al salvar informacion de la persona de emergencia'
                                                    }));
                                                } else {
                                                    emergencyEntity = emergencyPerson;
                                                }
                                            } catch (e) {
                                                res.json(response({
                                                    status: 'ERROR',
                                                    msg: 'Error al salvar informacion de la persona de emergencia'+e
                                                }));
                                            }

                                            data.StudentEntity.id_legal_representative = legalEntity.id_legal_representative;
                                            data.StudentEntity.id_mother = null;
                                            data.StudentEntity.id_father = null;
                                            data.StudentEntity.id_emergency_person = emergencyEntity.id_emergency_person;
                                    
                                            Student.create(data.StudentEntity).then(student => {
                                    
                                                if(student == null){
                                                    res.json(response({
                                                        status: 'ERROR',
                                                        msg: 'Error al salvar informacion del estudiante'
                                                    }));
                                                }
                            
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

                                                data.StudentHealthInformationEntity.id_student = student.id_student;
                        
                                                StudentHealthInformation.create(data.StudentHealthInformationEntity)
                                                .then(studentHealthInformation => {

                                                    console.log(`Toda la informacion de la planilla fue registrada con exito!`);
                                                    res.json(response({
                                                        status: 'SUCCESS',
                                                        msg: 'Toda la informacion de la planilla fue registrada con exito!'
                                                    }));

                                                }).catch((error) => {
                                                console.error(`Error al crear la informacion de salud del estudiante`, error);
                                                });
                                            
                                            }).catch((error) => {
                                                console.error(`Error al crear el registro del estudiante`, error);
                                            });

                                        }

                                    });

                        }

                    }

                });

        } else { // Reinscripción

            findLegalRepresentativeByIdentificationDocument
            (data.LegalRepresentativeEntity.identification_document).then(legalRepresentative => {

                legalRepresentative = data.LegalRepresentativeEntity;
                LegalRepresentative.update(legalRepresentative);
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
                    console.log(`Informacion del padre del estudiante ${studentExist.school_document} actualizada!`);

                }).catch((error) => {
                console.error(`Error al actualizar la informacion del padre del estudiante ${studentExist.school_document}`, error);
                });
            }

            // Actualizamos  los datos del estudiante
            findStudentEntityBySchool_document(data.StudentEntity.school_document).then(student => {

                student = data.StudentEntity;
                Student.update(student);
                console.log(`Informacion del estudiante actualizada!`);

            }).catch((error) => {
            console.error(`Error al actualizar la informacion del estudiante`, error);
            });

            // Actualizamos los datos de la persona de emergencia
            findEmergencyPersonByPhoneNumber
            (data.EmergencyPersonEntity.phone_number).then(emergencyPerson => {

                emergencyPerson = data.EmergencyPersonEntity;
                EmergencyPerson.update(emergencyPerson);
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
                console.log(`Informacion de salud del estudiante actualizada!`);

            }).catch((error) => {
            console.error(`Error al actualizar la informacion de salud del estudiante`, error);
            });

        }

    });

}

StudentController.getAllInformationByStudent = async (req, res) => {

    try {

        const data = req.body;
        const student = await findStudentEntityBySchool_document(data.StudentEntity.school_document);
        
        if (student === null) {
            return res.json(response({
                status: 'ERROR',
                msg: 'Estudiante no registrado'
            }));
        }
        
        const HousingStudentEntity = await findAllHousingStudentByIdStudent(student.id_student);
        
        if (HousingStudentEntity === null) {
            console.log('Error al buscar las respuestas de vivienda del estudiante');
        }

        const StudentHealthInformationEntity = await findStudentHealthInformationByIdStudent(student.id_student);
        
        const responseData = {
            ...student.toJSON(),
            HousingStudentEntity,
            StudentHealthInformationEntity
        };

        res.json(response({
            status: 'SUCCESS',
            msg: 'Información del estudiante devuelta',
            data: {
                StudentEntity: responseData
            }
        }));

    } catch (error) {
        console.error('Error:', error);
        res.json(response({
            status: 'ERROR',
            msg: 'Ha ocurrido un error al obtener la información del estudiante'
        }));
    }

};

StudentController.getAllStudents = async (req, res) => {

    try {

      const students = await findAllStudents();

      const formattedStudents = students.map(student => {

        return {
          StudentEntity: {
            names: student.names,
            last_names: student.last_names,
            school_document: student.school_document,
            age: student.age,
            LegalRepresentativeEntity: {
                names: student.LegalRepresentativeEntity.names,
                last_names: student.LegalRepresentativeEntity.last_names,
            },
          },
        };

      });

      res.json({
        status: 'SUCCESS',
        msg: 'Lista de estudiantes obtenida',
        data: formattedStudents,
      });

    } catch (error) {
      console.error('Error:', error);
      res.json({
        status: 'ERROR',
        msg: 'Ha ocurrido un error al obtener la lista de estudiantes',
      });
    }

};


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

StudentController.getAllHousingStudent = (req, res) => {

    let data = req.body;

    findAllHousingStudentByIdStudent(data.StudentEntity.id_student).then(housingStudentEntity => {

        if(housingStudentEntity == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Test devuelto'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: housingStudentEntity,
            }));
        }

    });

}

module.exports = StudentController;