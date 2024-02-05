const router = require("express").Router();

const studentsRouter = require("./students.routes");
router.use("/students", studentsRouter);

const cohortsRouter = require("./cohorts.routes");
router.use("/cohorts", cohortsRouter);

const userRouter = require("./users.routes");
router.use("/users", userRouter);

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

module.exports = router;
