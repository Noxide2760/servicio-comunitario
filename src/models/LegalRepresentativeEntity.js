const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_legal_representative',
    {

        id_legal_representative: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        names: {
            type: DataTypes.STRING,
            allownull: true,
        },

        last_names: {
            type: DataTypes.STRING,
            allownull: true,
        },

        identification_document: {
            type: DataTypes.STRING,
            allownull: true,
        },

        id_gender: {
            type:DataTypes.INTEGER,
            allowNull: true,
        },

        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        nationality: {
            type: DataTypes.STRING,
            allownull: true,
        },

        id_civil_status: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        occupation: {
            type: DataTypes.STRING,
            allownull: true,
        },

        id_academic_level: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        profession: {
            type: DataTypes.STRING,
            allownull: true,
        },

        id_working_condition: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        id_income_level: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        room_address: {
            type: DataTypes.STRING,
            allownull: true,
        },

        work_address: {
            type: DataTypes.STRING,
            allownull: true,
        },

        local_phone: {
            type: DataTypes.STRING,
            allownull: true,
        },

        cell_phone: {
            type: DataTypes.STRING,
            allownull: true,
        },

        work_phone: {
            type: DataTypes.STRING,
            allownull: true,
        },

        email: {
            type: DataTypes.STRING,
            allownull: true,
        },

        facebook_name: {
            type: DataTypes.STRING,
            allownull: true,
        },

        twitter_name: {
            type: DataTypes.STRING,
            allownull: true,
        },

        id_roles: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    })

};