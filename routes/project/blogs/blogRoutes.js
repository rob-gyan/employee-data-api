var express = require("express");
var blogsController = require("../../../controllers/project/blogs/blogsController");
var router = express.Router();
var auth = require("../../../middleware/auth");

// *********create Blog api*********
router.post("/createBlog", auth, async (req, res, next) => {
  try {
    let createBlog = await blogsController.blogCreate(req);
    let code = createBlog.statusCode;
    console.log(code);
    res.status(code).send(createBlog);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update blog api*********
router.patch("/updateBlog", auth, async (req, res) => {
  try {
    let createBlog = await blogsController.blogUpdate(req);
    let code = createBlog.statusCode;
    console.log(code);
    res.status(code).send(createBlog);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all blog api*********
router.post("/getAllBlog", auth, async (req, res) => {
  try {
    let getAllBlog = await blogsController.getAllBlogs(req);
    let code = getAllBlog.statusCode;
    console.log(code);
    res.status(code).send(getAllBlog);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get blog by id api*********
router.post("/getBlogById", auth, async (req, res) => {
  try {
    let getBlogById = await blogsController.getBlogById(req);
    let code = getBlogById.statusCode;
    console.log(code);
    res.status(code).send(getBlogById);
  } catch (error) {
    res.status(500).send(error);
  }
});
// *********get blog by id and assignee api*********
router.post("/getBlogByIdAssignee", auth, async (req, res) => {
  try {
    let getBlogByIdAssignee = await blogsController.getBlogByIdAssignee(req);
    let code = getBlogByIdAssignee.statusCode;
    console.log(code);
    res.status(code).send(getBlogByIdAssignee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete Blog by id api*********
router.delete("/deleteBlog", auth, async (req, res) => {
  try {
    let deleteBlog = await blogsController.deleteBlog(req);
    let code = deleteBlog.statusCode;
    console.log(code);
    res.status(code).send(deleteBlog);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
