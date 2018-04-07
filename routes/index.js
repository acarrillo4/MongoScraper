var router = require("express").Router();
var htmlRouter = require("./htmlRoutes");
var apiRouter = require("./apiRoutes");

router.use("/", htmlRouter);
router.use("/api/news", apiRouter);

module.exports = router;