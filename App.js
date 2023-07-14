const express = require('express');
const app = express();
const details = require('./operation');

app.use(express.json());
app.get("/getStudents", async (req, res) => {
    let result = {
        code: 200,
        message: "",
        data: null,
    }
   
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
                message: "There is no datas to fetch from the databases",
                data: null,
            }
        }
        res.send(result);
});

app.get("/getOneStudent", async (req, res) => {
    let result = {
        code: 200,
        message: "",
        data: null,
    }
   
        const { id } = req.body;
        let detail = await details.getStudentsById(id);
        if (detail) {
            result = {
                data: detail,
                message: "Student name fetched succefully",
                code: 200,
            }
        }
        else {
            result = {
                Message: "There is no student ID to get that students details",
            }
        }
        res.send(result);

});

app.get('/good', async (req, res) => {
        let detail = await details.getGood();
        if (detail) {
            result = {
                data: detail,
                message: "Students name with good marks fetched successfully",
                code: 200,
            }
        }
        else {
            result = {
                message: "There is no data to fetch, as per your requirement ",
                data: null,
            }
        }
        res.send(result);

   
})

app.get('/avg', async (req, res) => {
   
        let detail = await details.getAverage();
        if (detail) {
            result = {
                data: detail,
                message: "Students name with average mark fetched successfully",
                code: 200,
            }
        }
        if("") {
            result = {
                message: "There is no student with marks, as per your requirement ",
                data: null,
            }
        }
        res.send(result);
})

app.get('/exl', async (req, res) => {
    let result = {
        code: 200,
        message: "",
        data: null,
    }
    
        let detail = await details.getExcellence();
        if (detail) {
            result = {
                data: detail,
                message: "Students name with marks greater than 280 fetched successfully",
                code: 200,
            }
        }
        else {
            result = {
                code: 500,
                message: "Error occurred while fetching Students name ",
                data: null,
            }
        }
        res.send(result);

  
})


app.post('/create', async (req, res) => {
    const { fname, lname, marks } = req.body;

    
        await details.createDetails(fname, lname, marks)
        if (fname && lname && marks) {
            res.status(201).json({
                student: {
                    fname,
                    lname,
                },
                marks,
                Message: "Student name with their marks created successfully"
            });
        }
        if (!fname && lname && marks) {
            res.status(500).json({
                Message: "The firstName of the student cannot be empty"
            });
        }
        if (fname && !lname && marks) {
            res.status(500).json({
                Message: "The Last Name of the student cannot be empty"
            });
        }
        if (fname && lname && !marks) {
            res.status(500).json({
                Message: "The Marks of the student cannot be empty"
            });
        }
        if (!fname && !lname && marks) {
            res.status(500).json({
                Message: "First Name and Last Name of the student must be filled"
            });
        }
        if (!fname && !lname && !marks) {
            res.status(500).json({
                Message: "Please give the datas to create the student details"
            });
        }
        console.log(fname, lname, marks);
});

app.post('/update-marks', async (req, res) => {
    const { firstName, updatedMarks } = req.body;

   
        await details.updateMarks(firstName, updatedMarks);
        if (firstName && updatedMarks) { res.status(200).json({ message: 'Marks updated successfully' }); }
        if (!firstName && updatedMarks) {
            res.status(500).json({
                Message: "Please provide the first Name of the student to update the marks"
            });
        }
        if (firstName && !updatedMarks) {
            res.status(500).json({
                Message: "Please provide the marks of the student to update the marks"
            });
        }
        if (!firstName && !updatedMarks) {
            res.status(500).json({
                Message: "The field is empty"
            });
        }
});
app.delete("/deleteById", async (req, res) => {
    let result = {
        code: 200,
        message: "",
        data: null,
    }
   
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
})
module.exports = app
