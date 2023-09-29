const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_educational_grade_attend', 
    {

        id_educational_grade_attend: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        description: {
            type: DataTypes.STRING,
            allownull: true,
        },

    })

};