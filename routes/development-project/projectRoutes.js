var express = require("express");
const auth = require("../../middleware/auth");
var projectController = require("../../controllers/development-project/projectController");
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
router.post("/updateProject", auth, async (req, res) => {
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
router.post("/updateProjectStatus", auth, async (req, res) => {
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
router.get("/getAllProject", auth, async (req, res) => {
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
    let getEmployeeProject = await projectController.getAllProjectTask(req);
    let code = getEmployeeProject.statusCode;
    delete getEmployeeProject.statusCode;
    console.log(code);
    res.status(code).send(getEmployeeProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all project employee task api*********
router.post("/getAllProjectEmployeeTask", auth, async (req, res) => {
  try {
    let getProjects = await projectController.getAllProjectEmployeeTask(req);
    let code = getProjects.statusCode;
    delete getProjects.statusCode;
    console.log(code);
    res.status(code).send(getProjects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get All Project Task By ProjectId id api*********
router.post("/getAllProjectTaskByProjectId", auth, async (req, res) => {
  try {
    let getAllProjectTask = await projectController.getAllProjectTaskById(req);
    let code = getAllProjectTask.statusCode;
    console.log(code);
    res.status(code).send(getAllProjectTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get All Project Task By ProjectId and user id api*********
router.post("/getAllProjectTaskUserById", auth, async (req, res) => {
  try {
    let getAllProjectTask = await projectController.getAllProjectTaskUserById(
      req
    );
    let code = getAllProjectTask.statusCode;
    console.log(code);
    res.status(code).send(getAllProjectTask);
  } catch (error) {
    res.status(500).send(error);
  }
});
// *********get All Project Task By user  id api*********
router.post("/getAllProjectTaskByUser", auth, async (req, res) => {
  try {
    let getAllProjectTaskUser = await projectController.getAllProjectTaskByUser(
      req
    );
    let code = getAllProjectTaskUser.statusCode;
    console.log(code);
    res.status(code).send(getAllProjectTaskUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get  project by id api*********
router.post("/getProjectById", auth, async (req, res) => {
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
router.post("/getHomeTask", auth, async (req, res) => {
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
router.post("/deleteProject", auth, async (req, res) => {
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
router.post("/deleteKeyword", auth, async (req, res) => {
  try {
    let deleteKeyword = await projectController.deleteKeyword(req);
    res.status(200).send(deleteKeyword);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all General fields
router.post("/getAllAssignee", async (req, res) => {
  try {
    let getAllAssignee = await projectController.getAllAssignee(req);
    res.status(200).send(getAllAssignee);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
