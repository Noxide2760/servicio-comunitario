const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_type_of_birth', 
    {

        id_type_of_birth: {
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