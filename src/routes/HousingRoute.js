const router = require('express').Router();
const HousingController = require('../controllers/HousingController');

router.route('/getAllHousingQuestion')
    .get(HousingController.getAllHousingQuestion);

router.route('/getAllHousinganswer')
    .get(HousingController.getAllHousingAnswer);

module.exports = router;