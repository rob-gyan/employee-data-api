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

// get all key word on the basis of project id
router.post("/getAllKeyword", async (req, res) => {
  try {
    let getAllKeyword = await projectController.getAllKeyword(req);
    res.status(200).send(getAllKeyword);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all category
router.get("/getAllCategory", async (req, res) => {
  try {
    let getAllCategory = await projectController.getAllCategory(req);
    res.status(200).send(getAllCategory);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all profile
router.get("/getAllProfile", async (req, res) => {
  try {
    let getAllProfile = await projectController.getAllProfile(req);
    res.status(200).send(getAllProfile);
  } catch (error) {
    res.status(500).send(error);
  }
});
// get all type
router.get("/getAllType", async (req, res) => {
  try {
    let getAllType = await projectController.getAllType(req);
    res.status(200).send(getAllType);
  } catch (error) {
    res.status(500).send(error);
  }
});
// get all url
router.get("/getAllUrl", async (req, res) => {
  try {
    let getAllUrl = await projectController.getAllUrl(req);
    res.status(200).send(getAllUrl);
  } catch (error) {
    res.status(500).send(error);
  }
});
// get all website
router.get("/getAllWebsite", async (req, res) => {
  try {
    let getAllWebsite = await projectController.getAllWebsite(req);
    res.status(200).send(getAllWebsite);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all imagesize
router.get("/getAllImageSize", async (req, res) => {
  try {
    let getAllImageSize = await projectController.getAllImageSize(req);
    res.status(200).send(getAllImageSize);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all upload
router.get("/getAllUpload", async (req, res) => {
  try {
    let getAllUpload = await projectController.getAllUpload(req);
    res.status(200).send(getAllUpload);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all UrlBlog
router.post("/getAllUrlBlog", async (req, res) => {
  try {
    let getAllUrlBlog = await projectController.getAllUrlBlog(req);
    res.status(200).send(getAllUrlBlog);
  } catch (error) {
    res.status(500).send(error);
  }
});
// get all SocialTag
router.post("/getAllSocialTag", async (req, res) => {
  try {
    let getAllSocialTag = await projectController.getAllSocialTag(req);
    res.status(200).send(getAllSocialTag);
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
