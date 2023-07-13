// const {studentsDetails} = require('./db-details')
// const { json } = require('sequelize');
const {Marks} = require('./db-details')
const{ studentsDetails }= require('./db-details')
const { sequelize } = require('./db-connect')
const { Sequelize, DataTypes } = require('sequelize')
//To the all datas in the Table
const getStudents = async () => {
    try {
        let result = await (Marks&&studentsDetails).findAll({})
        // let mark = await Marks.findAll({})
        return JSON.parse(JSON.stringify(result));
        
    } catch (err) {
        console.log("Error..: ", err);
    }
}
// const getStudentsById = async (id) => {
//     try {
//         let result = await studentsDetails.findOne({
//             include: [
//                 {
//                     model: studentsDetails,
//                 },
//             ],
//             where:{id:id},
//         })
//         return JSON.parse(JSON.stringify(result));
//     } catch (err) {
//         console.log("Error..: ", err);
//     }
// }
///  "/create" STILL IN PROGRESS MARKS NOT UPDATING TO THE DATABASE
    const createDetails = async (fname,lname) => {
        try {
            const student = await studentsDetails.create({
                first_name: fname,
                last_name: lname
            });
            console.log("student name stored successfully", student.first_name)
            const newMarksData = await Marks.create({
                    tamil: 90,
                    english: 80,
                    maths: 70,
                  });
                
              await Marks.create(newMarksData);
          
              await student.setMarks(newMarksData);
          
              console.log("Marks record created and associated with the student.");
        }
        catch (err) {
            console.log("error occured", err)
        }
    }

    const getGood = async()=>
    {
        try{
            // 
            
            let marks = await Marks.findAll({
               attributes: [
                   'student_id',
                   [sequelize.fn('sum',sequelize.col('tamil')),'total_mark'],
                ],
                group:'student_id',
                having:{
                    total_mark:{
                        [Sequelize.Op.gte]:250
                    }
                }
               
            })   
            console.log(marks,'...')
        }
        catch(err){
            console.log("Error.........",err)
        }
        
    }


const deleteById = async(id)=>
 {
    try{
        let result = await studentsDetails.destroy({
            include: [
                {
                    model: studentsDetails,
                },
            ],
            where:{id:id},
        })
        console.log(result,"....")
        return JSON.parse(JSON.stringify(result))
    }
    catch(err){
        console.log("Error.........",err)
    }
 }

module.exports = {
    getStudents:getStudents,
    // getStudentsById:getStudentsById,
    deleteById:deleteById,
    getGood:getGood,
    createDetails:createDetails
}
