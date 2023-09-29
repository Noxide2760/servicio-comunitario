const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_housing_student', 
    {

        id_housing_student: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        id_student: {
            type:DataTypes.INTEGER,
            allowNull: true,
        },

        id_housing_question: {
            type:DataTypes.INTEGER,
            allowNull: true,
        },

        id_housing_answer: {
            type:DataTypes.INTEGER,
            allowNull: true,
        },

    })

};