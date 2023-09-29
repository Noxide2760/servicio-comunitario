const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_academic_level', 
    {

        id_academic_level: {
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