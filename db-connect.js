const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: "student_details",
    username: 'root',
    password: 'root@123',
    host: "localhost",
    dialect: "mariadb",
})

sequelize
    .authenticate()
    .then(()=>{
        console.log("DataBase connected sucessfuly")
    })
    .catch(err=>{
        console.log("Unable to Connect the DataBase",err)
    })

module.exports = {sequelize}