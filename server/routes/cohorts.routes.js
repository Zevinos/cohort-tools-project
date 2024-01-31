const router = require("express").Router();

const Cohort = require("../models/Cohorts.model");

router.get("/", (req, res) => {
  Cohort.find({}).then((cohorts) => {
    res.json(cohorts);
  });
});

//Creates a new cohort
router.post("/", async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    res.status(500).json({ error, message: "failed to create a Cohort" });
  }
});

//Retrieves all of the cohorts in the database collection
router.get("/", async (req, res) => {
  try {
    const allCohorts = await Cohort.find();
    res.status(200).json(allCohorts);
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get all cohorts" });
  }
});

//Retrieves a specific cohort by id
router.get("/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const oneCohort = await Cohort.findById(cohortId);
    res.status(200).json(oneCohort);
  } catch (error) {
    res.status(500).json({ error, message: "failed to get the cohort" });
  }
});

//Updates a specific cohort by id
router.put("/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const updatedCohortData = req.body;

    const updatedCohort = await Cohort.findByIdAndUpdate(
      cohortId,
      updatedCohortData,
      { new: true }
    );

    res.status(202).json(updatedCohort);
  } catch (error) {
    res.status(500).json({ error, message: "failed to put the cohort" });
  }
});

//Deletes a specific cohort by id
router.delete("/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const deleteCohort = await Cohort.findByIdAndDelete(deleteCohort);
  } catch (error) {
    res.status(500).json({ error, message: "failed to delete the cohort" });
  }
});

module.exports = router;
