const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_educational_level', 
    {

        id_educational_level: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        description: {
            type: DataTypes.STRING,
            allownull: true,
        },

    },{
        freezeTableName: true,
        timestamps: false,
    })

};