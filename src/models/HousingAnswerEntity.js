const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_housing_answer', 
    {

        id_housing_answer: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        answer: {
            type: DataTypes.STRING,
            allownull: true,
        },

        id_housing_question: {
            type: DataTypes.INTEGER,
            allownull: true,
        },

    })

};