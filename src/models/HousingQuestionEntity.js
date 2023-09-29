const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_housing_question', 
    {

        id_housing_question: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        question: {
            type: DataTypes.STRING,
            allownull: true,
        },

    })

};