var express = require("express");
var developmentController = require("../../../controllers/development-project/development/developmentController");
var router = express.Router();
var auth = require("../../../middleware/auth");

// *********create Development api*********
router.post("/createDevelopment", auth, async (req, res) => {
  try {
    let createDevelopment = await developmentController.developmentCreate(req);
    let code = createDevelopment.statusCode;
    console.log(code);
    res.status(code).send(createDevelopment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update Development api*********
router.patch("/updateDevelopment", auth, async (req, res) => {
  try {
    let createDevelopment = await developmentController.developmentUpdate(req);
    let code = createDevelopment.statusCode;
    console.log(code);
    res.status(code).send(createDevelopment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update Development Status api*********
router.put("/updateDevelopmentStatus", auth, async (req, res) => {
  try {
    let createDevelopmentStatus =
      await developmentController.developmentUpdateStatus(req);
    let code = createDevelopmentStatus.statusCode;
    console.log(code);
    res.status(code).send(createDevelopmentStatus);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update Development time api*********
router.put("/updateDevelopmentTime", auth, async (req, res) => {
  try {
    let createDevelopmentTime =
      await developmentController.developmentUpdateTime(req);
    let code = createDevelopmentTime.statusCode;
    console.log(code);
    res.status(code).send(createDevelopmentTime);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all Development api*********
router.post("/getAllDevelopmentByProjectId", auth, async (req, res) => {
  try {
    let getAllDevelopment = await developmentController.getAllDevelopment(req);
    let code = getAllDevelopment.statusCode;
    console.log(code);
    res.status(code).send(getAllDevelopment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete Development by id api*********
router.post("/deleteDevelopment", auth, async (req, res) => {
  try {
    let deleteDevelopment = await developmentController.deleteDevelopment(req);
    let code = deleteDevelopment.statusCode;
    console.log(code);
    res.status(code).send(deleteDevelopment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get Development Task By Id Development by id api*********
router.post("/getDevelopmentTaskById", auth, async (req, res) => {
  try {
    let getDevelopmentTask = await developmentController.getDevelopmentTask(
      req
    );
    let code = getDevelopmentTask.statusCode;
    console.log(code);
    res.status(code).send(getDevelopmentTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
