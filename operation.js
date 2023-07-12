const Students = require('./db-details')
const Marks = require('./db-details')
// const {studentsDetails} = require('./db-details')

//To the all datas in the Table
const getStudents = async () => {
    try {
        let result = await Students.findAll({
        })
        return JSON.parse(JSON.stringify(result));
    } catch (err) {
        console.log("Error..: ", err);
    }
}

    const createDetails = async (fname,lname) => {
        try {
            const student = await Students.create({
                first_name: fname,
                last_name: lname
            });
            console.log("student name stored successfully", student.first_name)
        }
        catch (err) {
            console.log("error occured", err)
        }
    }



const deleteById = async(Id)=>
 {
    try{
        let result = await Students.destroy({
            where:{
                id:Id
            }
        })
        return JSON.parse(JSON.stringify(result))
    }
    catch(err){
        console.log("Error.........",err)
    }
 }
 
// const getMarks = async () => {
//     try {
//         let result = await Marks.findAll({
//         })
//         return JSON.parse(JSON.stringify(result));
//     } catch (err) {
//         console.log("Error..: ", err);
//     }
// }

module.exports = {
    getStudents:getStudents,
    // getMarks:getMarks
    deleteById:deleteById,
    createDetails:createDetails
}
