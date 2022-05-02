var express = require("express");
var socialMediaController = require("../../../controllers/project/socialMedia/socialMediaController");
var router = express.Router();
const auth = require("../../../middleware/auth");

// *********create Socialmedia api*********
router.post("/createSocialMedia", auth, async (req, res) => {
  try {
    let createSocialMedia = await socialMediaController.socialMediaCreate(req);
    let code = createSocialMedia.statusCode;
    delete createSocialMedia.statusCode;
    console.log(code);
    res.status(code).send(createSocialMedia);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********update SocialMedia api*********
router.patch("/updateSocialMedia", auth, async (req, res) => {
  try {
    let createSocialMedia = await socialMediaController.socialMediaUpdate(req);
    let code = createSocialMedia.statusCode;
    delete createSocialMedia.statusCode;
    console.log(code);
    res.status(code).send(createSocialMedia);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get all social media api*********
router.post("/getAllSocialMedia", auth, async (req, res) => {
  try {
    let getAllSocialMedia = await socialMediaController.getAllSocialMedia(req);
    let code = getAllSocialMedia.statusCode;
    console.log(code);
    res.status(code).send(getAllSocialMedia);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********get SocialMedia by id api*********
router.post("/socialMediaById", auth, async (req, res) => {
  try {
    let getSocialMediaById = await socialMediaController.getSocialMediaById(
      req
    );
    let code = getSocialMediaById.statusCode;
    console.log(code);
    res.status(code).send(getSocialMediaById);
  } catch (error) {
    res.status(500).send(error);
  }
});
// *********get SocialMedia on the basis of assignee api*********
router.post("/socialMediaByIdAssignee", auth, async (req, res) => {
  try {
    let getSocialMediaByIdAssignee =
      await socialMediaController.getSocialMediaByIdAssignee(req);
    let code = getSocialMediaByIdAssignee.statusCode;
    console.log(code);
    res.status(code).send(getSocialMediaByIdAssignee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// *********delete SocialMedia by id api*********
router.delete("/deleteSocialMedia", auth, async (req, res) => {
  try {
    let deleteSocialMedia = await socialMediaController.deleteSocialMedia(req);
    let code = deleteSocialMedia.statusCode;
    console.log(code);
    res.status(code).send(deleteSocialMedia);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
