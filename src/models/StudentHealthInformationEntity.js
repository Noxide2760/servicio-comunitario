const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_student_health_information', {

        id_student_health_information: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        use_glasses: {
            type: DataTypes.BOOLEAN,
            allownull: true,
        },

        allergies: {
            type: DataTypes.STRING,
            allownull: true,
        },

        vaccines_received: {
            type: DataTypes.STRING,
            allownull: true,
        },

        treatments_received: {
            type: DataTypes.STRING,
            allownull: true,
        },

        medical_insurance: {
            type: DataTypes.BOOLEAN,
            allownull: true,
        },

        mother_age_at_time_of_pregnancy: {
            type: DataTypes.STRING,
            allownull: true,
        },

        id_type_of_birth: {
            type: DataTypes.INTEGER,
            allownull: true,
        },

        id_prenatal_history_at_birth: {
            type: DataTypes.INTEGER,
            allownull: true,
        },

        student_have_disability: {
            type: DataTypes.BOOLEAN,
            allownull: true,
        },

        special_attention: {
            type: DataTypes.BOOLEAN,
            allownull: true,
        },

        id_student: {
            type: DataTypes.INTEGER,
            allownull: true,
        },

    },{
        freezeTableName: true,
        timestamps: false,
    })

};