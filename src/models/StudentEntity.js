const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_student', 
    {

        id_student: {
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

        school_document: {
            type: DataTypes.STRING,
            allownull: true,
        },

        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        age: {
            type: DataTypes.INTEGER,
            allownull: true,
        },

        nationality: {
            type: DataTypes.STRING,
            allownull: true,
        },

        place_of_birth: {
            type: DataTypes.STRING,
            allownull: true,
        },

        child_number: {
            type: DataTypes.STRING,
            allownull: true,
        },

        phone_number: {
            type: DataTypes.STRING,
            allownull: true,
        },

        email_address: {
            type: DataTypes.STRING,
            allownull: true,
        },

        name_campus_from: {
            type: DataTypes.STRING,
            allownull: true,
        },

        promoted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },

        id_educational_grade_attend: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        professed_religion: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        has_mother: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },

        has_father: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },

        id_role_economic_representative: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        id_educational_level: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        living_with: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        arrival_and_departure_method: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        id_gender: {
            type:DataTypes.INTEGER,
            allowNull: true,
        },

        persons_authorized_pick_up: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        id_legal_representative: {
            type:DataTypes.INTEGER,
            allowNull: true,
        },

        id_mother: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        id_father: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    },{
        freezeTableName: true,
        timestamps: false,
    })

};