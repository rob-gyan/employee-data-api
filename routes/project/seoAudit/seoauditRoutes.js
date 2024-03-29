var express = require("express");
var seoAuditController = require("../../../controllers/project/seoAudit/seoauditController");
var router = express.Router();
const auth = require("../../../middleware/auth");

// *********update seoAudit api*********
router.post("/updateSeoAudit", auth, async (req, res) => {
  try {
    let createSeoAudit = await seoAuditController.seoAuditUpdate(req);
    let code = createSeoAudit.statusCode;
    console.log(code);
    res.status(code).send(createSeoAudit);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all SeoAudit api*********
router.post("/getAllSeoAuditByProjectId", auth, async (req, res) => {
  try {
    let getAllSeoAudit = await seoAuditController.getAllSeoAudit(req);
    let code = getAllSeoAudit.statusCode;
    console.log(code);
    res.status(code).send(getAllSeoAudit);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update SeoAudit Status api*********
router.put("/updateSeoAuditStatus", auth, async (req, res) => {
  try {
    let createSeoAuditStatus = await seoAuditController.seoAuditUpdateStatus(
      req
    );
    let code = createSeoAuditStatus.statusCode;
    console.log(code);
    res.status(code).send(createSeoAuditStatus);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update SeoAudit time api*********
router.put("/updateSeoAuditTime", auth, async (req, res) => {
  try {
    let createSeoAuditTime = await seoAuditController.seoAuditUpdateTime(req);
    let code = createSeoAuditTime.statusCode;
    console.log(code);
    res.status(code).send(createSeoAuditTime);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get SeoAudit's Task By Id backlink by id api*********
router.post("/getSeoAuditTaskById", auth, async (req, res) => {
  try {
    let getSeoAuditTask = await seoAuditController.getSeoAuditTask(req);
    let code = getSeoAuditTask.statusCode;
    console.log(code);
    res.status(code).send(getSeoAuditTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete SeoAudit by id api*********
router.post("/deleteSeoAudit", auth, async (req, res) => {
  try {
    let deleteSeoAudit = await seoAuditController.deleteSeoAudit(req);
    let code = deleteSeoAudit.statusCode;
    console.log(code);
    res.status(code).send(deleteSeoAudit);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********upload SeoAudit table *********
router.post("/uploadSeoAuditTable", auth, async (req, res) => {
  try {
    let uploadSeoAuditTable = await seoAuditController.uploadSeoAuditTable(req);
    let code = uploadSeoAuditTable.statusCode;
    console.log(code);
    res.status(code).send(uploadSeoAuditTable);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all SeoAudit table *********
router.post("/getSeoAuditTable", auth, async (req, res) => {
  try {
    let getSeoAuditTable = await seoAuditController.getSeoAuditTable(req);
    let code = getSeoAuditTable.statusCode;
    console.log(code);
    res.status(code).send(getSeoAuditTable);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********create update SeoAudit top ten key table *********
router.post("/updateCompetition", auth, async (req, res) => {
  try {
    let updateCompetition = await seoAuditController.createCompetitionApi(req);
    let code = updateCompetition.statusCode;
    console.log(code);
    res.status(code).send(updateCompetition);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********create update SeoAudit top ten key table *********
router.post("/showCompetition", auth, async (req, res) => {
  try {
    let showCompetition = await seoAuditController.showCompetitionApi(req);
    let code = showCompetition.statusCode;
    console.log(code);
    res.status(code).send(showCompetition);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
