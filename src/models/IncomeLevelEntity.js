const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_income_level', 
    {

        id_income_level: {
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