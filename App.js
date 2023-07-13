const express = require('express');
const app = express();
const details = require('./operation');
const {studentsDetails,Marks} = require("./db-details")

app.get("/getStudents", async (req, res) => {
    let result = {
        code: 200,
        message: "",
        data: null,
    }
    try {
        let detail = await details.getStudents();
        if (detail) {
            result = {
                data: detail,
                message: "Students name fetched succefully",
                code: 200,
            }
        }
        else {
            result = {
                code: 500,
                message: "Error occurred while fetching all Students name ",
                data: null,
            }
        }
        res.send(result);

    } catch (err) {
        console.log("Error occurred in all Students name  fetching API: ", err);
        result = {
            code: 500,
            message: "Error occurred while fetching all Students name ",
            data: null,
        }
        res.send(result);
    }
});

app.get("/getOneStudent", async (req, res) => {
    let result = {
        code: 200,
        message: "",
        data: null,
    }
    try {
        // const { id } = req.body;  
        let detail = await details.getStudentsById();
        if (detail) {
            result = {
                data: detail,
                message: "Students name fetched succefully",
                code: 200,
            }
        }
        else {
            result = {
                code: 500,
                message: "Error occurred while fetching all Students name ",
                data: null,
            }
        }
        res.send(result);

    } catch (err) {
        console.log("Error occurred in all Students name  fetching API: ", err);
        result = {
            code: 500,
            message: "Error occurred while fetching Student name ",
            data: null,
        }
        res.send(result);
    }
});

app.get('/good',async(req,res)=>{
    let result = {
        code: 200,
        message: "",
        data: null,
    }
    try {
        let detail = await details.getGood();
        if (detail) {
            result = {
                data: detail,
                message: "Students name fetched succefully",
                code: 200,
            }
        }
        else {
            result = {
                code: 500,
                message: "Error occurred while fetching all Students name ",
                data: null,
            }
        }
        res.send(result);

    } catch (err) {
        console.log("Error occurred in all Students name  fetching API: ", err);
        result = {
            code: 500,
            message: "Error ",
            data: null,
        }
        res.send(result);
    }
})

app.use(express.json());
app.post('/create', async (req, res) => {
    const { fname, lname,marks } = req.body;
    
    try {
      // Create student record
      const student=await details.createDetails(
        fname,
        lname,
        marks
    );
    
    const createdMarks = await details.createDetails({
        ...marks,
        student_id:studentsDetails.id
    });
    res.status(201).json({
        student:{
            fname,
            lname,
        },
        marks:createdMarks
    })
    // await student.setMarks(createdMarks)
    console.log(fname,lname,marks)
    
  console.log(createdMarks,"............")
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating student and marks records.' });
      console.log("body___",error)
    }
  });

app.get("/getMarks", async (req, res) => {
    let result = {
        code: 200,
        message: "",
        data: null,
    }
    try {
        let detail = await details.getMarks();
        if (detail) {
            result = {
                data: detail,
                message: "Students marks fetched succefully",
                code: 200,
            }
        }
        else {
            result = {
                code: 500,
                message: "Error occurred while fetching all Students marks ",
                data: null,
            }
        }
        res.send(result);

    } catch (err) {
        console.log("Error occurred in all Students marks  fetching API: ", err);
        result = {
            code: 500,
            message: "Error occurred while fetching all Students marks ",
            data: null,
        }
        res.send(result);
    }
});
app.delete("/deleteById", async (req, res) => {
    let result = {
        code: 200,
        message: "",
        data: null,
    }
    try {
        const { id } = req.body;       
        let detail = await details.deleteById(id)
        if (detail) {
            result = {
                code: 200,
                DeleteStatus: detail,
                message: "Student's details has been Deleted successfully"
            }
        }
        else {
            result =
            {
                code: 500,
                message: "Please give the existing student's Id to delete"
            }
        }
        res.send(result)
    }
    catch (err) {
        console.log("error occured", err);
        result = {
            code: 200,
            message: "Error Occured Successfully......",
            data: null,
        }
        res.send(result)
    }
})
module.exports = app
