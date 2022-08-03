var express = require("express");
var testingController = require("../../../controllers/development-project/testing/testingController");
var router = express.Router();
var auth = require("../../../middleware/auth");

// *********create Testing api*********
router.post("/createTesting", auth, async (req, res) => {
  try {
    let createTesting = await testingController.testingCreate(req);
    let code = createTesting.statusCode;
    console.log(code);
    res.status(code).send(createTesting);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update Testing api*********
router.patch("/updateTesting", auth, async (req, res) => {
  try {
    let createTesting = await testingController.testingUpdate(req);
    let code = createTesting.statusCode;
    console.log(code);
    res.status(code).send(createTesting);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update Testing Status api*********
router.put("/updateTestingStatus", auth, async (req, res) => {
  try {
    let createTestingStatus = await testingController.testingUpdateStatus(req);
    let code = createTestingStatus.statusCode;
    console.log(code);
    res.status(code).send(createTestingStatus);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update Testing time api*********
router.put("/updateTestingTime", auth, async (req, res) => {
  try {
    let createTestingTime = await testingController.testingUpdateTime(req);
    let code = createTestingTime.statusCode;
    console.log(code);
    res.status(code).send(createTestingTime);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all Testing api*********
router.post("/getAllTestingByProjectId", auth, async (req, res) => {
  try {
    let getAllTesting = await testingController.getAllTesting(req);
    let code = getAllTesting.statusCode;
    console.log(code);
    res.status(code).send(getAllTesting);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete Testing by id api*********
router.post("/deleteTesting", auth, async (req, res) => {
  try {
    let deleteTesting = await testingController.deleteTesting(req);
    let code = deleteTesting.statusCode;
    console.log(code);
    res.status(code).send(deleteTesting);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get Testing Task By Id Testing by id api*********
router.post("/getTestingTaskById", auth, async (req, res) => {
  try {
    let getTestingTask = await testingController.getTestingTask(req);
    let code = getTestingTask.statusCode;
    console.log(code);
    res.status(code).send(getTestingTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
