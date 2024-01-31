const router = require("express").Router();

const Student = require("../models/Students.model");

//Creates a new student
router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Failed to create a student." });
  }
});

//Retrieves all of the students in the database collection
router.get("/", async (req, res) => {
  try {
    const allStudents = await Student.find().populate("cohort");
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get all students." });
  }
});

//Retrieves all of the students for a given cohort
router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const allStudents = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");

    res.status(200).json(allStudents);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Failed to get  all the students of the cohort.",
    });
  }
});

//Retrieves a specific student by id
router.get("/:studentId", async (req, res) => {
  try {
    const oneStudent = await Student.findById(req.params.studentId).populate(
      "cohort"
    );
    res.status(200).json(oneStudent);
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get the student." });
  }
});

//Updates a specific student by id
router.put("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const updatedStudentData = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      { new: true }
    );

    res.status(202).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error, message: "failed to put the Student" });
  }
});

//Deletes a specific student by id
router.delete("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    await Student.findByIdAndDelete(studentId);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error, message: "Failed to delete student." });
  }
});

module.exports = router;
