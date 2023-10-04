const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('t_prenatal_history_at_birth', 
    {

        id_prenatal_history_at_birth: {
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