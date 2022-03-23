var express = require("express");
var backlinkController = require("../../../controllers/project/backlink/backlinkController");
var router = express.Router();

// *********create backlink api*********
router.post("/createBacklink", async (req, res) => {
  try {
    let createBacklink = await backlinkController.backlinkCreate(req);
    let code = createBacklink.statusCode;
    console.log(code);
    res.status(code).send(createBacklink);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update backlink api*********
router.patch("/updateBacklink", async (req, res) => {
  try {
    let createBacklink = await backlinkController.backlinkUpdate(req);
    let code = createBacklink.statusCode;
    console.log(code);
    res.status(code).send(createBacklink);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update backlink Status api*********
router.put("/updateBacklinkStatus", async (req, res) => {
  try {
    let createBacklinkStatus = await backlinkController.backlinkUpdateStatus(
      req
    );
    let code = createBacklinkStatus.statusCode;
    console.log(code);
    res.status(code).send(createBacklinkStatus);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update backlink time api*********
router.put("/updateBacklinkTime", async (req, res) => {
  try {
    let createBacklinkTime = await backlinkController.backlinkUpdateTime(req);
    let code = createBacklinkTime.statusCode;
    console.log(code);
    res.status(code).send(createBacklinkTime);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all backlink api*********
router.post("/getAllBacklinkByProjectId", async (req, res) => {
  try {
    let getAllBacklink = await backlinkController.getAllBacklink(req);
    let code = getAllBacklink.statusCode;
    console.log(code);
    res.status(code).send(getAllBacklink);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete backlink by id api*********
router.delete("/deleteBacklink", async (req, res) => {
  try {
    let deleteBacklink = await backlinkController.deleteBacklink(req);
    let code = deleteBacklink.statusCode;
    console.log(code);
    res.status(code).send(deleteBacklink);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get Backlink Task By Id backlink by id api*********
router.post("/getBacklinkTaskById", async (req, res) => {
  try {
    let getBacklinkTask = await backlinkController.getBacklinkTask(req);
    let code = getBacklinkTask.statusCode;
    console.log(code);
    res.status(code).send(getBacklinkTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********test backlink api*********
router.post("/testBacklink", async (req, res) => {
  try {
    let deleteBacklink = await backlinkController.testBacklink(req);
    let code = deleteBacklink.statusCode;
    console.log(code);
    res.status(code).send(deleteBacklink);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
