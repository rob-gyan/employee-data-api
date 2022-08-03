var express = require("express");
var rdTaskController = require("../../../controllers/development-project/rd-tasks/rdTasksController");
var router = express.Router();
const auth = require("../../../middleware/auth");

// *********create RDTask api*********
router.post("/createRDTask", auth, async (req, res) => {
  try {
    let createRDTask = await rdTaskController.rdTaskCreate(req);
    let code = createRDTask.statusCode;
    delete createRDTask.statusCode;
    console.log(code);
    res.status(code).send(createRDTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update RDTask api*********
router.patch("/updateRDTask", auth, async (req, res) => {
  try {
    let createRDTask = await rdTaskController.RDTaskUpdate(req);
    let code = createRDTask.statusCode;
    delete createRDTask.statusCode;
    console.log(code);
    res.status(code).send(createRDTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all RDTask on the basis of projectId api*********
router.post("/getAllRDTask", auth, async (req, res) => {
  try {
    let getAllRDTask = await rdTaskController.getAllRDTasks(req);
    let code = getAllRDTask.statusCode;
    delete getAllRDTask.statusCode;
    console.log(code);
    res.status(code).send(getAllRDTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all RDTask on the basis of projectId and RDTask Id api*********
router.post("/getRDTaskById", auth, async (req, res) => {
  try {
    let getRDTaskById = await rdTaskController.getRDTaskById(req);
    let code = getRDTaskById.statusCode;
    delete getRDTaskById.statusCode;
    console.log(code);
    res.status(code).send(getRDTaskById);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update RDTask Status api*********
router.put("/updateRDTaskStatus", auth, async (req, res) => {
  try {
    let createRDTaskStatus = await rdTaskController.rdTaskUpdateStatus(req);
    let code = createRDTaskStatus.statusCode;
    console.log(code);
    res.status(code).send(createRDTaskStatus);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update RDTask time api*********
router.put("/updateRDTaskTime", auth, async (req, res) => {
  try {
    let createRDTaskTime = await rdTaskController.rdTaskUpdateTime(req);
    let code = createRDTaskTime.statusCode;
    console.log(code);
    res.status(code).send(createRDTaskTime);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete RDTask by id api*********
router.post("/deleteRDTask", auth, async (req, res) => {
  try {
    let deleteRDTask = await rdTaskController.deleteRDTask(req);
    let code = deleteRDTask.statusCode;
    delete deleteRDTask.statusCode;
    console.log(code);
    res.status(code).send(deleteRDTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
