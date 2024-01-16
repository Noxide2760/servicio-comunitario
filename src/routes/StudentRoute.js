const router = require('express').Router();
const StudentController = require('../controllers/StudentController');

router.route('/getAllAcademicLevel')
    .get(StudentController.getAllAcademicLevel);

router.route('/getAllEducationalGradeAttend')
    .get(StudentController.getAllEducationalGradeAttend);

router.route('/getAllEducationalLevel')
    .get(StudentController.getAllEducationalLevel);

router.route('/getAllRoles')
    .get(StudentController.getAllRoles);

router.route('/getAllGender')
    .get(StudentController.getAllGender);

router.route('/getAllCivilStatus')
    .get(StudentController.getAllCivilStatus);

router.route('/getAllWorkingCondition')
    .get(StudentController.getAllWorkingCondition);  

router.route('/getAllIncomeLevel')
    .get(StudentController.getAllIncomeLevel);

router.route('/getAllPrenatalHistoryAtBirth')
    .get(StudentController.getAllPrenatalHistoryAtBirth);

router.route('/getAllTypeOfBirth')
    .get(StudentController.getAllTypeOfBirth);

router.route('/saveStudentInformation')
    .post(StudentController.saveStudentInformation);

router.route('/getAllInformationByStudent')
    .post(StudentController.getAllInformationByStudent);

router.route('/getAllStudents')
    .get(StudentController.getAllStudents);

router.route('/getTest')
    .post(StudentController.getTest);

router.route('/getAllHousingStudent')
    .post(StudentController.getAllHousingStudent);

module.exports = router;