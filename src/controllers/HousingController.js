const HousingController = {};
const {HousingQuestion} = require('../db/sequelize');
const {HousingAnswer} = require('../db/sequelize');
const response = require('../utils/response');

function findAllHousingQuestion(){
    return HousingQuestion.findAll();
}

function findAllHousingAnswer(){
    return HousingAnswer.findAll();
}

HousingController.getAllHousingQuestion = (req, res) => {
    findAllHousingQuestion().then(housingQuestion => {
        if(housingQuestion == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Preguntas de vivienda no disponibles'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: housingQuestion,
            }));
        }
    });

}

HousingController.getAllHousingAnswer = (req, res) => {
    findAllHousingAnswer().then(housingAnswer => {
        if(housingAnswer == null){
            res.json(response({
                status: 'ERROR',
                msg: 'Respuestas de vivienda no disponibles'
            }));
        } else {
            res.json(response({
                status: 'SUCCESS',
                data: housingAnswer,
            }));
        }
    });

}


module.exports = HousingController;