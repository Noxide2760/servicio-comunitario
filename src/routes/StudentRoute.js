const router = require('express').Router();
const StudentController = require('../controllers/StudentController');

router.route('/getAllEducationalLevelAttend')
    .get(StudentController.getAllEducationalGradeAttend);



module.exports = router;