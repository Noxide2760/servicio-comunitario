const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_working_condition', 
    {

        id_working_condition: {
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