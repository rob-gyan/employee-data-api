var express = require("express");
var fourmController = require("../../../controllers/project/fourms/fourmController");
var router = express.Router();
const auth = require("../../../middleware/auth");

// *********create fourm api*********
router.post("/createFourm", auth, async (req, res) => {
  try {
    let createFourm = await fourmController.fourmCreate(req);
    let code = createFourm.statusCode;
    delete createFourm.statusCode;
    console.log(code);
    res.status(code).send(createFourm);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update fourm api*********
router.patch("/updateFourm", auth, async (req, res) => {
  try {
    let createFourm = await fourmController.fourmUpdate(req);
    let code = createFourm.statusCode;
    delete createFourm.statusCode;
    console.log(code);
    res.status(code).send(createFourm);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all fourm on the basis of projectId api*********
router.post("/getAllFourm", auth, async (req, res) => {
  try {
    let getAllFourm = await fourmController.getAllFourms(req);
    let code = getAllFourm.statusCode;
    delete getAllFourm.statusCode;
    console.log(code);
    res.status(code).send(getAllFourm);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all fourm on the basis of projectId and fourm Id api*********
router.post("/getFourmById", auth, async (req, res) => {
  try {
    let getFourmById = await fourmController.getFourmById(req);
    let code = getFourmById.statusCode;
    delete getFourmById.statusCode;
    console.log(code);
    res.status(code).send(getFourmById);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update fourm Status api*********
router.put("/updateFourmStatus", auth, async (req, res) => {
  try {
    let createFourmStatus = await fourmController.fourmUpdateStatus(req);
    let code = createFourmStatus.statusCode;
    console.log(code);
    res.status(code).send(createFourmStatus);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update fourm time api*********
router.put("/updateFourmTime", auth, async (req, res) => {
  try {
    let createFourmTime = await fourmController.fourmUpdateTime(req);
    let code = createFourmTime.statusCode;
    console.log(code);
    res.status(code).send(createFourmTime);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete fourm by id api*********
router.delete("/deleteFourm", auth, async (req, res) => {
  try {
    let deleteFourm = await fourmController.deleteFourm(req);
    let code = deleteFourm.statusCode;
    delete deleteFourm.statusCode;
    console.log(code);
    res.status(code).send(deleteFourm);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
