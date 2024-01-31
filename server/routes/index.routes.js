const router = require("express").Router();

const studentsRouter = require("./students.routes");
router.use("/students", studentsRouter);

const cohortsRouter = require("./cohorts.routes");
router.use("/cohorts", cohortsRouter);

module.exports = router;
