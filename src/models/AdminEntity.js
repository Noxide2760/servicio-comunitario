const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_admin', 
    {

        id_admin: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        username: {
            type: DataTypes.STRING,
            allownull: true,
        },

        password: {
            type: DataTypes.STRING,
            allownull: true,
        }
    },{
        freezeTableName: true,
        timestamps: false,
    })

};