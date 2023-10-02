const router = require('express').Router();
const AdminController = require('../controllers/AdminController');
// const validateJWT = require('../middlewares/validateJWT');

router.route('/login')
    .post(AdminController.loginUser);

router.route('/register')
    .post(AdminController.createUser);


module.exports = router;