var express = require("express");
var discussionController = require("../../../controllers/development-project/development-discussion/discussionController");
var router = express.Router();
var auth = require("../../../middleware/auth");

// *********create discussion api*********
router.post("/createDiscussion", auth, async (req, res) => {
  try {
    let createDiscussion = await discussionController.discussionCreate(req);
    let code = createDiscussion.statusCode;
    console.log(code);
    res.status(code).send(createDiscussion);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update Discussion api*********
router.patch("/updateDiscussion", auth, async (req, res) => {
  try {
    let createDiscussion = await discussionController.discussionUpdate(req);
    let code = createDiscussion.statusCode;
    console.log(code);
    res.status(code).send(createDiscussion);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all Discussion api*********
router.post("/getAllDiscussion", auth, async (req, res) => {
  try {
    let getAllDiscussion = await discussionController.getAllDiscussions(req);
    let code = getAllDiscussion.statusCode;
    console.log(code);
    res.status(code).send(getAllDiscussion);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete Discussion by id api*********
router.delete("/deleteDiscussion", auth, async (req, res) => {
  try {
    let deleteDiscussion = await discussionController.deleteDiscussion(req);
    let code = deleteDiscussion.statusCode;
    console.log(code);
    res.status(code).send(deleteDiscussion);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
