const router = require("express").Router();

const Student = require("../models/Students.model");

//Creates a new student
router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Retrieves all of the students in the database collection
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.program) {
      filter.program = req.query.program;
    }

    const allStudents = await Student.find(filter).populate("cohort");
    res.status(200).json(allStudents);
  } catch (err) {
    next(err);
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
    next(error);
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
    next(error);
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
    next(error);
  }
});

//Deletes a specific student by id
router.delete("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    await Student.findByIdAndDelete(studentId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
