var express = require("express");
const auth = require("../../middleware/auth");
var projectController = require("../../controllers/project/projectController");
var router = express.Router();

// *********create project api*********
router.post("/createProject", auth, async (req, res) => {
  try {
    let createProject = await projectController.projectCreate(req);
    let code = createProject.statusCode;
    delete createProject.statusCode;
    console.log(code);
    res.status(code).send(createProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update project api*********
router.post("/updateProject", async (req, res) => {
  try {
    let createProject = await projectController.projectUpdate(req);
    let code = createProject.statusCode;
    delete createProject.statusCode;
    console.log(code);
    res.status(code).send(createProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update project status api*********
router.post("/updateProjectStatus", async (req, res) => {
  try {
    let createProject = await projectController.projectUpdateStatus(req);
    let code = createProject.statusCode;
    delete createProject.statusCode;
    console.log(code);
    res.status(code).send(createProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all project api*********
router.get("/getAllProject", async (req, res) => {
  try {
    let getProjects = await projectController.getAllProject(req);
    let code = getProjects.statusCode;
    delete getProjects.statusCode;
    console.log(code);
    res.status(code).send(getProjects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all project task api*********
router.get("/getAllProjectTask", async (req, res) => {
  try {
    let getProjects = await projectController.getAllProjectTask(req);
    let code = getProjects.statusCode;
    delete getProjects.statusCode;
    console.log(code);
    res.status(code).send(getProjects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get All Project Task By ProjectId backlink by id api*********
router.post("/getAllProjectTaskByProjectId", async (req, res) => {
  try {
    let getAllProjectTask = await projectController.getAllProjectTaskById(req);
    let code = getAllProjectTask.statusCode;
    console.log(code);
    res.status(code).send(getAllProjectTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get  project by id api*********
router.post("/getProjectById", async (req, res) => {
  try {
    let getProject = await projectController.getProjectById(req);
    let code = getProject.statusCode;
    delete getProject.statusCode;
    console.log(code);
    res.status(code).send(getProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all project task api*********
router.post("/getHomeTask", async (req, res) => {
  try {
    let getProjects = await projectController.getHomeTask(req);
    let code = getProjects.statusCode;
    delete getProjects.statusCode;
    console.log(code);
    res.status(code).send(getProjects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete project by id api*********
router.post("/deleteProject", async (req, res) => {
  try {
    let deleteProject = await projectController.deleteProject(req);
    let code = deleteProject.statusCode;
    delete deleteProject.statusCode;
    console.log(code);
    res.status(code).send(deleteProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete key word on the basis of project id
router.post("/deleteKeyword", async (req, res) => {
  try {
    let deleteKeyword = await projectController.deleteKeyword(req);
    res.status(200).send(deleteKeyword);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all General fields
router.post("/getAllGeneralField", async (req, res) => {
  try {
    let getAllGeneralField = await projectController.getAllGeneralField(req);
    res.status(200).send(getAllGeneralField);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
