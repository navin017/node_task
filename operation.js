const { Marks } = require('./db-details')
const { studentsDetails } = require('./db-details')
const { sequelize } = require('./db-connect')
const { Sequelize, DataTypes } = require('sequelize')

const getStudents = async () => {
    try {
        let result = await (studentsDetails).findAll({
            include: Marks,
        })
        return JSON.parse(JSON.stringify(result));

    } catch (err) {
        console.log("Error..: ", err);
    }
}

const getStudentsById = async (id) => {
    try {
        let result = await studentsDetails.findOne({
            where: { id },
            include: [Marks],
        })
        console.log(result, "^^^^^^^^^^^^")
        return JSON.parse(JSON.stringify(result));
    } catch (err) {
        console.log("Error..: ", err);
    }
}


const createDetails = async (fname, lname, marks) => {
    try {
        const student = await studentsDetails.create({
            first_name: fname,
            last_name: lname,
        });

        console.log("Student name stored successfully:", student.first_name);

        const newMarksData = await Marks.create({
            tamil: marks.tamil,
            english: marks.english,
            maths: marks.maths,
            student_id: student.id
        });

        console.log("Marks record created and associated with the student.");
    } catch (err) {
        console.log("Error occurred:", err);
    }
};
const updateMarks = async (firstName, updatedMarks) => {
    try {
        const student = await studentsDetails.findOne({
            where: { first_name: firstName },
        });

        await Marks.update(updatedMarks, {
            where: { student_id: student.id },
        });

        console.log(`Marks record updated for student with first name '${firstName}'.`);
    } catch (err) {
        console.log("Error occurred:", err);
    }
}
const getGood = async () => {
    try {
        const marks = await Marks.findAll({
            include: studentsDetails,
            attributes: [
                'student_id',
                [
                    sequelize.literal('SUM(tamil) + SUM(english) + SUM(maths)'),
                    'total_mark',
                ],
            ],
            group: 'student_id',
            having: sequelize.literal('total_mark >= 250'),
        });
        return JSON.parse(JSON.stringify(marks));
    } catch (err) {
        console.log("Error:", err);
    }
};

const getAverage = async () => {
    try {
        const marks = await Marks.findAll({
            include: studentsDetails,
            attributes: [
                'student_id',
                [
                    sequelize.literal('SUM(tamil) + SUM(english) + SUM(maths)'),
                    'total_mark',
                ],
            ],
            group: 'student_id',
            having: sequelize.literal('total_mark  <200 '),
        });
        return JSON.parse(JSON.stringify(marks));
    } catch (err) {
        console.log("Error:", err);
    }
};

const getExcellence = async () => {
    try {
        const marks = await Marks.findAll({
            include: studentsDetails,
            attributes: [
                'student_id',
                [
                    sequelize.literal('SUM(tamil) + SUM(english) + SUM(maths)'),
                    'total_mark',
                ],
            ],
            group: 'student_id',
            having: sequelize.literal('total_mark >=280 '),
        });
        return JSON.parse(JSON.stringify(marks));
    } catch (err) {
        console.log("Error:", err);
    }
};

const deleteById = async (id) => {
    try {
        let result = await studentsDetails.destroy({
            include: [
                {
                    model: studentsDetails,
                },
            ],
            where: { id: id },
        })
        console.log(result, "....")
        return JSON.parse(JSON.stringify(result))
    }
    catch (err) {
        console.log("Error.........", err)
    }
}

module.exports = {
    getStudents: getStudents,
    getStudentsById: getStudentsById,
    deleteById: deleteById,
    getGood: getGood,
    createDetails: createDetails,
    updateMarks: updateMarks,
    getAverage: getAverage,
    getExcellence: getExcellence
}
