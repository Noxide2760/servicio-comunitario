const router = require('express').Router();
const StudentController = require('../controllers/StudentController');

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

router.route('/saveStudentInformation')
    .post(StudentController.saveStudentInformation);

router.route('/getTest')
    .post(StudentController.getTest);

module.exports = router;