const express = require('express');
const app = express();
const details = require('./operation');


//"/getStudents" Route to get the all detail in table
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
//Creating new Student_name
app.use(express.json());
app.post('/create', async (req, res) => {
    let result = {
        code: 200,
        message: "",
        data: null,
    }
    try {
        const studentfName = req.body.fname;
        const studentlName = req.body.lname
        console.log("body-------", studentfName, studentlName);
        await details.createDetails(studentfName, studentlName);
        if (studentfName&&studentlName) {
            result = {
                data: `${studentfName} ${studentlName}`,
                message: "Students name fetched succefully",
                code: 200,
            }
        }
        if(studentfName&& !studentlName) {
            result = {
                code: 500,
                message: "Please fill the Last name of the student",
                data: null,
            }
        }
        if(!studentfName&& studentlName) {
            result = {
                code: 500,
                message: "Please fill the first name of the student",
                data: null,
            }
        }
        res.send(result)
    }
    catch(err){
        console.log("Error occurred in  Students name  creating API: ", err);
        result = {
            code: 500,
            message: "Error occurred while creating Students name ",
            data: null,
        }
        res.send(result);
    }
})

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
app.post("/deleteById", async (req, res) => {
    let result = {
        code: 200,
        message: "",
        data: null,
    }
    try {
        let id = req.body;
        let detail = await details.deleteById(id)
        if (detail) {
            result = {
                code: 200,
                DeleteStatus: detail,
                message: "Task has been Deleted successfully"
            }
        }
        else {
            result =
            {
                code: 500,
                message: "null",
                data: null,
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
