const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_civil_status', 
    {

        id_civil_status: {
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