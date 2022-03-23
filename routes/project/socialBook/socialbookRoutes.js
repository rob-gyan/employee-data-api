var express = require("express");
var socialBookController = require("../../../controllers/project/socialBook/socialbookController");
var router = express.Router();
const auth = require("../../../middleware/auth");

// *********create SocialBook api*********
router.post("/createSocialBook", async (req, res) => {
  try {
    let createSocialBook = await socialBookController.socialBookCreate(req);
    let code = createSocialBook.statusCode;
    console.log(code);
    res.status(code).send(createSocialBook);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update SocialBook api*********
router.patch("/updateSocialBook", async (req, res) => {
  try {
    let createSocialBook = await socialBookController.socialBookUpdate(req);
    let code = createSocialBook.statusCode;
    console.log(code);
    res.status(code).send(createSocialBook);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all SocialBook api*********
router.post("/getAllSocialBook", async (req, res) => {
  try {
    let getAllSocialBook = await socialBookController.getAllSocialBook(req);
    let code = getAllSocialBook.statusCode;
    console.log(code);
    res.status(code).send(getAllSocialBook);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update SocialBook Status api*********
router.put("/updateSocialBookStatus", async (req, res) => {
  try {
    let createSocialBookStatus =
      await socialBookController.socialBookUpdateStatus(req);
    let code = createSocialBookStatus.statusCode;
    console.log(code);
    res.status(code).send(createSocialBookStatus);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update socialBook time api*********
router.put("/updateSocialBookTime", async (req, res) => {
  try {
    let createSocialBookTime = await socialBookController.socialBookUpdateTime(
      req
    );
    let code = createSocialBookTime.statusCode;
    console.log(code);
    res.status(code).send(createSocialBookTime);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get SocialBook's Task By Id backlink by id api*********
router.post("/getSocialBookTaskById", async (req, res) => {
  try {
    let getSocialBookTask = await socialBookController.getSocialBookTask(req);
    let code = getSocialBookTask.statusCode;
    console.log(code);
    res.status(code).send(getSocialBookTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete SocialBook by id api*********
router.delete("/deleteSocialBook", async (req, res) => {
  try {
    let deleteSocialBook = await socialBookController.deleteSocialBook(req);
    let code = deleteSocialBook.statusCode;
    console.log(code);
    res.status(code).send(deleteSocialBook);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
