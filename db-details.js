const { sequelize } = require('./db-connect')
const { Sequelize, DataTypes } = require('sequelize')



const studentsDetails = sequelize.define('students', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: 'students',
        timestamps: false
    })
    

// const Marks = sequelize.define('Marks', {
//     student_id: {
//         // type: DataTypes.INTEGER,
//         type: DataTypes.UUID,
//     },
//     tamil: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     english: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     maths: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
// },
//     {
//         tableName: 'marks',
//         timestamps: false
//     })
module.exports = 
// Marks,
studentsDetails;


