const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_emergency_person', 
    {

        id_emergency_person: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        relationship: {
            type: DataTypes.STRING,
            allownull: true,
        },

        phone_number: {
            type: DataTypes.STRING,
            allownull: true,
        },

        id_student: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    },{
        freezeTableName: true,
        timestamps: false,
    })

};