const { Sequelize } = require('sequelize');
const StudentEntity = require('../models/StudentEntity');
const EducationalGradeAttendEntity = require('../models/EducationalGradeAttendEntity');
const RolesEntity = require('../models/RolesEntity');
const EducationalLevelEntity = require('../models/EducationalLevelEntity');
const GenderEntity = require('../models/GenderEntity');
const LegalRepresentativeEntity = require('../models/LegalRepresentativeEntity');
const CivilStatusEntity = require('../models/CivilStatusEntity');
const AcademicLevelEntity = require('../models/AcademicLevelEntity');
const WorkingConditionEntity = require('../models/WorkingConditionEntity');
const IncomeLevelEntity = require('../models/IncomeLevelEntity');
const EmergencyPersonEntity = require('../models/EmergencyPersonEntity');
const HousingQuestionEntity = require('../models/HousingQuestionEntity');
const HousingAnswerEntity = require('../models/HousingAnswerEntity');
const PrenatalHistoryAtBirthEntity = require('../models/PrenatalHistoryAtBirthEntity');
const TypeOfBirthEntity = require('../models/TypeOfBirthEntity');
const StudentHealthInformationEntity = require('../models/StudentHealthInformationEntity');
const HousingStudentEntity = require('../models/HousingStudentEntity');
const AdminEntity = require('../models/AdminEntity');
const ParentsEntity = require('../models/ParentsEntity');


// Conexion con la bd
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/serv.comunitario');


const Student = StudentEntity(sequelize);
const EducationalGradeAttend = EducationalGradeAttendEntity(sequelize);
const Roles = RolesEntity(sequelize);
const EducationalLevel = EducationalLevelEntity(sequelize);
const Gender = GenderEntity(sequelize);
const LegalRepresentative = LegalRepresentativeEntity(sequelize);
const CivilStatus = CivilStatusEntity(sequelize);
const AcademicLevel = AcademicLevelEntity(sequelize);
const WorkingCondition = WorkingConditionEntity(sequelize);
const IncomeLevel = IncomeLevelEntity(sequelize);
const EmergencyPerson = EmergencyPersonEntity(sequelize);
const HousingQuestion = HousingQuestionEntity(sequelize);
const HousingAnswer = HousingAnswerEntity(sequelize);
const PrenatalHistoryAtBirth = PrenatalHistoryAtBirthEntity(sequelize);
const TypeOfBirth = TypeOfBirthEntity(sequelize);
const StudentHealthInformation = StudentHealthInformationEntity(sequelize);
const HousingStudent = HousingStudentEntity(sequelize);
const Admin = AdminEntity(sequelize);
const Parents = ParentsEntity(sequelize);


// ForeignKeys relations
Student.belongsTo(EducationalGradeAttend, { foreignKey: 'id_educational_grade_attend', as: 'EducationalGradeAttendEntity'});
Student.belongsTo(Roles, { foreignKey: 'id_role_economic_representative', as: 'RoleEconomicRepresentative'});
Student.belongsTo(EducationalLevel, { foreignKey: 'id_educational_level', as: 'EducationalLevelEntity'});
Student.belongsTo(Gender, { foreignKey: 'id_gender', as: 'GenderEntity'});
Student.belongsTo(LegalRepresentative, { foreignKey: 'id_legal_representative', as:'LegalRepresentativeEntity'});
Student.belongsTo(Parents, {foreignKey: 'id_mother', as: 'MotherEntity'});
Student.belongsTo(Parents, {foreignKey: 'id_father', as: 'FatherEntity'});
Student.belongsTo(EmergencyPerson, {foreignKey: 'id_emergency_person', as: 'EmergencyPersonEntity'});

LegalRepresentative.belongsTo(Gender, { foreignKey: 'id_gender', as: 'GenderEntity'});
LegalRepresentative.belongsTo(CivilStatus, { foreignKey: 'id_civil_status', as: 'CivilStatusEntity'});
LegalRepresentative.belongsTo(AcademicLevel, { foreignKey: 'id_academic_level', as: 'AcademicLevelEntity'});
LegalRepresentative.belongsTo(WorkingCondition, { foreignKey: 'id_working_condition', as: 'WorkingConditionEntity'});
LegalRepresentative.belongsTo(IncomeLevel, { foreignKey: 'id_income_level', as: 'IncomeLevelEntity'});
LegalRepresentative.belongsTo(Roles, { foreignKey: 'id_roles', as: 'RolesEntity'});

Parents.belongsTo(Gender, { foreignKey: 'id_gender', as: 'GenderEntity'});
Parents.belongsTo(CivilStatus, { foreignKey: 'id_civil_status', as: 'CivilStatusEntity'});
Parents.belongsTo(AcademicLevel, { foreignKey: 'id_academic_level', as: 'AcademicLevelEntity'});
Parents.belongsTo(WorkingCondition, { foreignKey: 'id_working_condition', as: 'WorkingConditionEntity'});
Parents.belongsTo(IncomeLevel, { foreignKey: 'id_income_level', as: 'IncomeLevelEntity'});
Parents.belongsTo(Roles, { foreignKey: 'id_roles', as: 'RolesEntity'});

HousingAnswer.belongsTo(HousingQuestion, { foreignKey: 'id_housing_question'});

StudentHealthInformation.belongsTo(TypeOfBirth, { foreignKey: 'id_type_of_birth'});
StudentHealthInformation.belongsTo(PrenatalHistoryAtBirth, { foreignKey: 'id_prenatal_history_at_birth'});

HousingStudent.belongsTo(Student, { foreignKey: 'id_student'});
HousingStudent.belongsTo(HousingQuestion, { foreignKey: 'id_housing_question'});
HousingStudent.belongsTo(HousingAnswer, { foreignKey: 'id_housing_answer'});


module.exports = {Student, LegalRepresentative, EmergencyPerson, EducationalGradeAttend, 
    Roles, EducationalLevel, Gender, CivilStatus, AcademicLevel, WorkingCondition, 
    HousingQuestion, HousingAnswer, PrenatalHistoryAtBirth, IncomeLevel, TypeOfBirth,
    StudentHealthInformation, HousingStudent, Admin, Parents, sequelize};