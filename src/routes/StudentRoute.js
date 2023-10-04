const router = require('express').Router();
const StudentController = require('../controllers/StudentController');

router.route('/getAllEducationalGradeAttend')
    .get(StudentController.getAllEducationalGradeAttend);

router.route('/getAllEducationalLevel')
    .get(StudentController.getAllEducationalLevel);


module.exports = router;