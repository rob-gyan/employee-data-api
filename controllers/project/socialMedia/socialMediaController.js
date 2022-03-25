let db = require("../../../models");

const SocialMediaTable = db.socialmediatables;
const SocialMediaContent = db.socialmediapostcontents;
const SocialMediaPost = db.socialmediaposts;
const SocialMedia = db.socialmedias;
const Project = db.projects;

// **********socialMedia create api controller**********
exports.socialMediaCreate = async (req) => {
  try {
    let {
      postContent,
      postContentType,
      postContentAssignee,
      postContentPlateform,
      postContentStartDate,
      postContentDueDate,
      postContentStatus,
      postContentTimeEstimation,
      postContentTime,
      media,
      mediaAdditionalImage,
      mediaAssignee,
      mediaImage,
      mediaStartDate,
      mediaDueDate,
      mediaStatus,
      mediaTimeEstimation,
      mediaTime,
      post,
      postAssignee,
      postSetTime,
      postSetDate,
      postStartDate,
      postDueDate,
      postStatus,
      postTimeEstimation,
      postTime,
      projectId,
      status,
    } = req.body;
    if (projectId == "" || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find project
    let projectFind = await Project.findOne({
      where: { id: projectId },
    });

    // if project doesn't exist
    if (projectFind == null) {
      return {
        data: null,
        error: "project doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    // add socialMediaContent topic information
    var socialMediaContentCreate = await SocialMediaContent.create({
      postContent,
      postContentType,
      postContentAssignee,
      postContentPlateform,
      postContentStartDate,
      postContentDueDate,
      projectId,
      postContentStatus,
      postContentTimeEstimation,
      postContentTime,
    });

    // add socialMedia  information
    var socialMediaCreate = await SocialMedia.create({
      media,
      mediaAdditionalImage,
      mediaAssignee,
      mediaImage,
      mediaStartDate,
      mediaDueDate,
      projectId,
      mediaStatus,
      mediaTimeEstimation,
      mediaTime,
    });

    // add socialmedia post information
    var socialMediaPostCreate = await SocialMediaPost.create({
      post,
      postAssignee,
      postSetTime,
      postSetDate,
      postStartDate,
      postDueDate,
      projectId,
      postStatus,
      postTimeEstimation,
      postTime,
    });

    const postContentId = socialMediaContentCreate.dataValues.id;
    const mediaId = socialMediaCreate.dataValues.id;
    const postId = socialMediaPostCreate.dataValues.id;

    // create socialMedia
    var socialMedia = await SocialMediaTable.create({
      postContentId,
      mediaId,
      postId,
      projectId,
      taskType: "SOCIALMEDIA",
      projectName: projectFind.dataValues.projectName,
      status,
    });

    return {
      data: socialMedia,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********social media update api controller**********
exports.socialMediaUpdate = async (req) => {
  try {
    let {
      socialMediaId,
      projectId,
      postContent,
      postContentType,
      postContentAssignee,
      postContentPlateform,
      postContentStartDate,
      postContentDueDate,
      postContentStatus,
      postContentTimeEstimation,
      postContentTime,
      media,
      mediaAdditionalImage,
      mediaAssignee,
      mediaImage,
      mediaStartDate,
      mediaDueDate,
      mediaStatus,
      mediaTimeEstimation,
      mediaTime,
      post,
      postAssignee,
      postSetTime,
      postSetDate,
      postStartDate,
      postDueDate,
      postStatus,
      postTimeEstimation,
      postTime,
      status,
    } = req.body;

    if (
      socialMediaId == "" ||
      projectId == "" ||
      !socialMediaId ||
      !projectId
    ) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find socialmedia
    let socialMediaFind = await SocialMediaTable.findOne({
      where: { id: socialMediaId, projectId },
    });

    // if socialMedia doesn't exist
    if (socialMediaFind == null) {
      return {
        data: null,
        error: "socialMedia doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find socialMedia postcontent
    let socialMediaContentFind = await SocialMediaContent.findOne({
      where: { id: socialMediaFind.dataValues.postContentId },
    });

    // if blog topic doesn't exist
    if (socialMediaContentFind == null) {
      return {
        data: null,
        error: "socialMediaContent doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    // update socialMediaContent
    await socialMediaContentFind.update({
      postContent,
      postContentType,
      postContentAssignee,
      postContentPlateform,
      postContentStartDate,
      postContentDueDate,
      postContentStatus,
      postContentTimeEstimation,
      postContentTime,
    });

    // find social media
    let socialMediasFind = await SocialMedia.findOne({
      where: { id: socialMediaFind.dataValues.mediaId },
    });

    // if social media doesn't exist
    if (socialMediasFind == null) {
      return {
        data: null,
        error: "socialMedia doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    // update socialMedia
    await socialMediasFind.update({
      media,
      mediaAdditionalImage,
      mediaAssignee,
      mediaImage,
      mediaStartDate,
      mediaDueDate,
      mediaStatus,
      mediaTimeEstimation,
      mediaTime,
    });

    // find social media post
    let socialMediaPostFind = await SocialMediaPost.findOne({
      where: { id: socialMediaFind.dataValues.postId },
    });

    // if blog upload doesn't exist
    if (socialMediaPostFind == null) {
      return {
        data: null,
        error: "social Media Post doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    // update socialMediaPostFind
    await socialMediaPostFind.update({
      post,
      postAssignee,
      postSetTime,
      postSetDate,
      postStartDate,
      postDueDate,
      postStatus,
      postTimeEstimation,
      postTime,
    });

    return {
      data: "updated blog!!",
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get all socialMedia api controller**********
exports.getAllSocialMedia = async (req) => {
  try {
    const { projectId } = req.body;
    if (projectId == "" || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find all socialMedia
    let allsocialMediaData = await SocialMediaTable.findAll({
      where: { projectId },
    });
    const socialMediaLength = allsocialMediaData.length;

    const allSocialMedia = [];
    for (let index = 0; index < socialMediaLength; index++) {
      const element = allsocialMediaData[index];
      const allSocialMediaElement = [element];

      for (const ele of allSocialMediaElement) {
        console.log(ele.id);
        let allSocialMediaPostContent = await SocialMediaContent.findOne({
          where: { id: ele.postContentId },
        });
        // console.log(allSocialMediaPostContent.id);
        let allSocialMedias = await SocialMedia.findOne({
          where: { id: ele.mediaId },
        });
        // console.log(allSocialMedias.id);
        let allSocialMediaPost = await SocialMediaPost.findOne({
          where: { id: ele.postId },
        });
        // console.log(allSocialMediaPost.id);
        allSocialMedia.push({
          id: ele.id,
          postContent: allSocialMediaPostContent.postContent,
          postContentType: allSocialMediaPostContent.postContentType,
          postContentAssignee: allSocialMediaPostContent.postContentAssignee,
          postContentPlateform: allSocialMediaPostContent.postContentPlateform,
          postContentStartDate: allSocialMediaPostContent.postContentStartDate,
          postContentDueDate: allSocialMediaPostContent.postContentDueDate,
          postContentStatus: allSocialMediaPostContent.postContentStatus,
          postContentTimeEstimation:
            allSocialMediaPostContent.postContentTimeEstimation,
          postContentTime: allSocialMediaPostContent.postContentTime,
          media: allSocialMedias.media,
          mediaAdditionalImage: allSocialMedias.mediaAdditionalImage,
          mediaAssignee: allSocialMedias.mediaAssignee,
          mediaImage: allSocialMedias.mediaImage,
          mediaStartDate: allSocialMedias.mediaStartDate,
          mediaDueDate: allSocialMedias.mediaDueDate,
          mediaStatus: allSocialMedias.mediaStatus,
          mediaTimeEstimation: allSocialMedias.mediaTimeEstimation,
          mediaTime: allSocialMedias.mediaTime,
          post: allSocialMediaPost.post,
          postAssignee: allSocialMediaPost.postAssignee,
          postSetTime: allSocialMediaPost.postSetTime,
          postSetDate: allSocialMediaPost.postSetDate,
          postStartDate: allSocialMediaPost.postStartDate,
          postDueDate: allSocialMediaPost.postDueDate,
          postStatus: allSocialMediaPost.postStatus,
          postTimeEstimation: allSocialMediaPost.postTimeEstimation,
          postTime: allSocialMediaPost.postTime,
          projectId: ele.projectId,
          projectName: ele.projectName,
        });
      }
    }

    return {
      data: allSocialMedia,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get social media task on the basis of projectId,socialMediaId  **********
exports.getSocialMediaById = async (req) => {
  const { socialMediaId, projectId } = req.body;
  try {
    if (
      socialMediaId == "" ||
      projectId == "" ||
      !socialMediaId ||
      !projectId
    ) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find social media
    let socialMediaElement = await SocialMediaTable.findOne({
      where: { id: socialMediaId, projectId },
    });
    if (socialMediaElement == null) {
      return {
        data: null,
        error: null,
        message: "data not found.",
        statusCode: 200,
      };
    }
    socialMediaElement = [socialMediaElement];

    const socialMediaById = [];
    for (const ele of socialMediaElement) {
      let allSocialMediaPostContent = await SocialMediaContent.findOne({
        where: { id: ele.postContentId },
      });
      // console.log(allSocialMediaPostContent.id);
      let allSocialMedias = await SocialMedia.findOne({
        where: { id: ele.mediaId },
      });
      // console.log(allSocialMedias.id);
      let allSocialMediaPost = await SocialMediaPost.findOne({
        where: { id: ele.postId },
      });
      // console.log(allSocialMediaPost.id);
      socialMediaById.push({
        id: ele.id,
        postContent: allSocialMediaPostContent.postContent,
        postContentType: allSocialMediaPostContent.postContentType,
        postContentAssignee: allSocialMediaPostContent.postContentAssignee,
        postContentPlateform: allSocialMediaPostContent.postContentPlateform,
        postContentStartDate: allSocialMediaPostContent.postContentStartDate,
        postContentDueDate: allSocialMediaPostContent.postContentDueDate,
        postContentStatus: allSocialMediaPostContent.postContentStatus,
        postContentTimeEstimation:
          allSocialMediaPostContent.postContentTimeEstimation,
        postContentTime: allSocialMediaPostContent.postContentTime,
        media: allSocialMedias.media,
        mediaAdditionalImage: allSocialMedias.mediaAdditionalImage,
        mediaAssignee: allSocialMedias.mediaAssignee,
        mediaImage: allSocialMedias.mediaImage,
        mediaStartDate: allSocialMedias.mediaStartDate,
        mediaDueDate: allSocialMedias.mediaDueDate,
        mediaStatus: allSocialMedias.mediaStatus,
        mediaTimeEstimation: allSocialMedias.mediaTimeEstimation,
        mediaTime: allSocialMedias.mediaTime,
        post: allSocialMediaPost.post,
        postAssignee: allSocialMediaPost.postAssignee,
        postSetTime: allSocialMediaPost.postSetTime,
        postSetDate: allSocialMediaPost.postSetDate,
        postStartDate: allSocialMediaPost.postStartDate,
        postDueDate: allSocialMediaPost.postDueDate,
        postStatus: allSocialMediaPost.postStatus,
        postTimeEstimation: allSocialMediaPost.postTimeEstimation,
        postTime: allSocialMediaPost.postTime,
        projectId: ele.projectId,
        projectName: ele.projectName,
      });
    }

    const data = socialMediaById;
    if (data == null) {
      return {
        data: null,
        error: "Something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: data,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********delete SocialMedia api by id controller**********
exports.deleteSocialMedia = async (req) => {
  try {
    let { socialMediaId } = req.body;

    if (socialMediaId == "" || !socialMediaId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    let findSocialMedia = await SocialMediaTable.findOne({
      where: { id: socialMediaId },
    });
    // if SocialMedia doesn't exist
    if (findSocialMedia == null) {
      return {
        data: null,
        error: "SocialMedia doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    } else {
      // if exist delete them
      let deleteSocialMedia = await SocialMediaTable.destroy({
        where: { id: findSocialMedia.dataValues.id },
      });
      await SocialMediaContent.destroy({
        where: { id: findSocialMedia.dataValues.postContentId },
      });
      await SocialMedia.destroy({
        where: { id: findSocialMedia.dataValues.mediaId },
      });
      await SocialMediaPost.destroy({
        where: { id: findSocialMedia.dataValues.postId },
      });

      return {
        data: deleteSocialMedia,
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};