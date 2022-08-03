var express = require("express");
var designController = require("../../../controllers/development-project/design/designController");
var router = express.Router();
var auth = require("../../../middleware/auth");

// *********create Design api*********
router.post("/createDesign", auth, async (req, res) => {
  try {
    let createDesign = await designController.designCreate(req);
    let code = createDesign.statusCode;
    console.log(code);
    res.status(code).send(createDesign);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update Design api*********
router.patch("/updateDesign", auth, async (req, res) => {
  try {
    let createDesign = await designController.designUpdate(req);
    let code = createDesign.statusCode;
    console.log(code);
    res.status(code).send(createDesign);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update Design Status api*********
router.put("/updateDesignStatus", auth, async (req, res) => {
  try {
    let createDesignStatus = await designController.designUpdateStatus(req);
    let code = createDesignStatus.statusCode;
    console.log(code);
    res.status(code).send(createDesignStatus);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update Design time api*********
router.put("/updateDesignTime", auth, async (req, res) => {
  try {
    let createDesignTime = await designController.designUpdateTime(req);
    let code = createDesignTime.statusCode;
    console.log(code);
    res.status(code).send(createDesignTime);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all Design api*********
router.post("/getAllDesignByProjectId", auth, async (req, res) => {
  try {
    let getAllDesign = await designController.getAlldesign(req);
    let code = getAllDesign.statusCode;
    console.log(code);
    res.status(code).send(getAllDesign);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete Design by id api*********
router.post("/deleteDesign", auth, async (req, res) => {
  try {
    let deleteDesign = await designController.deleteDesign(req);
    let code = deleteDesign.statusCode;
    console.log(code);
    res.status(code).send(deleteDesign);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get Design Task By Id Design by id api*********
router.post("/getDesignTaskById", auth, async (req, res) => {
  try {
    let getDesignTask = await designController.getDesignTask(req);
    let code = getDesignTask.statusCode;
    console.log(code);
    res.status(code).send(getDesignTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
