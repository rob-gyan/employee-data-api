let db = require("../../../models");

const SocialMediaTable = db.socialmediatables;
const SocialMediaContent = db.socialmediapostcontents;
const SocialMediaPost = db.socialmediaposts;
const SocialMedia = db.socialmedias;
const Project = db.projects;
const Plateform = db.plateforms;
const Media = db.medias;
const Post = db.posts;
const AdditionalImage = db.additionalimages;
const Type = db.types;

// **********socialMedia create api controller**********
exports.socialMediaCreate = async (req) => {
  try {
    let {
      fileRichText,
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
      addImage,
      extraImage,
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
      createdBy,
      mediaAssignedBy,
      postAssignedBy,
      postContentAssignedBy,
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

    // find type
    let typeFind = await Type.findOne({
      where: { type: postContentType },
    });

    if (typeFind == null) {
      await Type.create({ type: postContentType });
    }

    // find plateform
    let plateformFind = await Plateform.findOne({
      where: { postContentPlateform },
    });
    if (plateformFind == null) {
      await Plateform.create({ postContentPlateform });
    }

    // find media
    let mediaFind = await Media.findOne({
      where: { media },
    });
    if (mediaFind == null) {
      await Media.create({ media });
    }

    // find AdditionalImage
    // let additionalimage = await AdditionalImage.findOne({
    //   where: { mediaAdditionalImage },
    // });
    // if (additionalimage == null) {
    //   await AdditionalImage.create({ mediaAdditionalImage });
    // }

    // find Post
    // let generalPost = await Post.findOne({
    //   where: { post },
    // });

    // if (generalPost == null) {
    //   await Post.create({ post });
    // }

    // set dynamic status
    let DynamicpostContentStatus;
    if (postContentAssignee === "" || postContentAssignee === undefined) {
      DynamicpostContentStatus = "UNASSIGNED";
    } else if (postContentStatus === "" || postContentStatus === undefined) {
      DynamicpostContentStatus = "PENDING";
    } else {
      DynamicpostContentStatus = postContentStatus;
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
      postContentStatus: DynamicpostContentStatus,
      postContentTimeEstimation,
      postContentTime,
      postContentAssignedBy:
        postContentAssignee === "" ? null : postContentAssignedBy,
    });

    // set dynamic status
    let DynamicmediaStatus;
    if (mediaAssignee === "" || mediaAssignee === undefined) {
      DynamicmediaStatus = "UNASSIGNED";
    } else if (mediaStatus === "" || mediaStatus === undefined) {
      DynamicmediaStatus = "PENDING";
    } else {
      DynamicmediaStatus = mediaStatus;
    }

    // add socialMedia  information
    var socialMediaCreate = await SocialMedia.create({
      media,
      mediaAdditionalImage,
      mediaAssignee,
      mediaImage,
      mediaStartDate,
      mediaDueDate,
      projectId,
      mediaStatus: DynamicmediaStatus,
      mediaTimeEstimation,
      mediaTime,
      addImage,
      extraImage,
      mediaAssignedBy: mediaAssignee === "" ? null : mediaAssignedBy,
    });

    // set dynamic status
    let DynamicpostStatus;
    if (postAssignee === "" || postAssignee === undefined) {
      DynamicpostStatus = "UNASSIGNED";
    } else if (postStatus === "" || postStatus === undefined) {
      DynamicpostStatus = "PENDING";
    } else {
      DynamicpostStatus = postStatus;
    }

    // add socialmedia post information
    var socialMediaPostCreate = await SocialMediaPost.create({
      post,
      postAssignee,
      postSetTime,
      postSetDate,
      postStartDate,
      postDueDate,
      projectId,
      postStatus: DynamicpostStatus,
      postTimeEstimation,
      postTime,
      postAssignedBy: postAssignee === "" ? null : postAssignedBy,
    });

    const postContentId = socialMediaContentCreate.dataValues.id;
    const mediaId = socialMediaCreate.dataValues.id;
    const postId = socialMediaPostCreate.dataValues.id;

    // create socialMedia
    var socialMedia = await SocialMediaTable.create({
      fileRichText,
      postContentId,
      mediaId,
      postId,
      projectId,
      taskType: "SOCIALMEDIA",
      projectName: projectFind.dataValues.projectName,
      status,
      createdBy,
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
      fileRichText,
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
      addImage,
      extraImage,
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
      mediaAssignedBy,
      postAssignedBy,
      postContentAssignedBy,
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
    await socialMediaFind.update({ fileRichText });
    // find socialMedia postcontent
    let socialMediaContentFind = await SocialMediaContent.findOne({
      where: { id: socialMediaFind.dataValues.postContentId },
    });

    // if socialMedia topic doesn't exist
    if (socialMediaContentFind == null) {
      return {
        data: null,
        error: "socialMediaContent doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find type
    let typeFind = await Type.findOne({
      where: { type: postContentType },
    });

    if (typeFind == null) {
      await Type.create({ type: postContentType });
    }

    // find plateform
    let plateformFind = await Plateform.findOne({
      where: { postContentPlateform },
    });
    if (plateformFind == null) {
      await Plateform.create({ postContentPlateform });
    }

    // find media
    let mediaFind = await Media.findOne({
      where: { media },
    });
    if (mediaFind == null) {
      await Media.create({ media });
    }

    // find AdditionalImage
    let additionalimage = await AdditionalImage.findOne({
      where: { mediaAdditionalImage },
    });
    if (additionalimage == null) {
      await AdditionalImage.create({ mediaAdditionalImage });
    }

    // find Post
    // let generalPost = await Post.findOne({
    //   where: { post },
    // });

    // if (generalPost == null) {
    //   await Post.create({ post });
    // }

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
      postContentAssignedBy:
        socialMediaContentFind.postContentAssignee === postContentAssignee
          ? socialMediaContentFind.postContentAssignee
          : postContentAssignedBy,
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
      addImage,
      extraImage,
      mediaAssignedBy:
        socialMediasFind.mediaAssignee === mediaAssignee
          ? socialMediasFind.mediaAssignee
          : mediaAssignedBy,
    });

    // find social media post
    let socialMediaPostFind = await SocialMediaPost.findOne({
      where: { id: socialMediaFind.dataValues.postId },
    });

    // if socialMedia upload doesn't exist
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
      postAssignedBy:
        socialMediaPostFind.postAssignee === postAssignee
          ? socialMediaPostFind.postAssignee
          : mediaAssignedBy,
    });

    return {
      data: "updated socialMedia!!",
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
    // get today date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    today = new Date(today);

    const allSocialMedia = [];
    for (let index = 0; index < socialMediaLength; index++) {
      const element = allsocialMediaData[index];
      const allSocialMediaElement = [element];

      for (const ele of allSocialMediaElement) {
        let allSocialMediaPostContent = await SocialMediaContent.findOne({
          where: { id: ele.postContentId },
        });
        // social media post content status update dynamicaly
        let overPostContentDate = new Date(
          allSocialMediaPostContent.postContentDueDate
        );

        if (
          overPostContentDate < today &&
          allSocialMediaPostContent.postContentStatus != "ONHOLD" &&
          allSocialMediaPostContent.postContentStatus != "ONHOLD" &&
          allSocialMediaPostContent.postContentStatus != "UNASSIGNED" &&
          allSocialMediaPostContent.postContentStatus != "COMPLETE" &&
          allSocialMediaPostContent.postContentStatus != "PROCESSING"
          // &&
          // allSocialMediaPostContent.postContentStatus != "PROCESSING"
        ) {
          await allSocialMediaPostContent.update({
            postContentStatus: "DELAY",
          });
        }

        let allSocialMedias = await SocialMedia.findOne({
          where: { id: ele.mediaId },
        });
        // social media MEDIA status update dynamicaly
        let overMediaDate = new Date(allSocialMedias.mediaDueDate);

        if (
          overMediaDate < today &&
          allSocialMedias.mediaStatus != "ONHOLD" &&
          allSocialMedias.mediaStatus != "ONHOLD" &&
          allSocialMedias.mediaStatus != "UNASSIGNED" &&
          allSocialMedias.mediaStatus != "COMPLETE" &&
          allSocialMedias.mediaStatus != "PROCESSING"
          //  &&
          // allSocialMedias.mediaStatus != "PROCESSING"
        ) {
          await allSocialMedias.update({
            mediaStatus: "DELAY",
          });
        }
        // console.log(allSocialMedias.id);
        let allSocialMediaPost = await SocialMediaPost.findOne({
          where: { id: ele.postId },
        });
        // social media MEDIA status update dynamicaly
        let overPostDate = new Date(allSocialMediaPost.postDueDate);

        if (
          overPostDate < today &&
          allSocialMediaPost.postStatus != "ONHOLD" &&
          allSocialMediaPost.postStatus != "ONHOLD" &&
          allSocialMediaPost.postStatus != "UNASSIGNED" &&
          allSocialMediaPost.postStatus != "COMPLETE" &&
          allSocialMediaPost.postStatus != "PROCESSING"
          //  &&
          // allSocialMediaPost.postStatus != "PROCESSING"
        ) {
          await allSocialMediaPost.update({
            postStatus: "DELAY",
          });
        }
        // console.log(allSocialMediaPost.id);
        allSocialMedia.push({
          id: ele.id,
          fileRichText: ele.fileRichText,
          createdAt: ele.createdAt,
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
          addImage: allSocialMedias.addImage,
          extraImage: allSocialMedias.extraImage,
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
          taskType: ele.taskType,
          status:
            allSocialMediaPostContent.postContentStatus == "COMPLETE"
              ? "COMPLETE"
              : allSocialMedias.mediaStatus == "COMPLETE"
              ? "COMPLETE"
              : allSocialMediaPost.postStatus == "COMPLETE"
              ? "COMPLETE"
              : "PENDING",
          mediaAssignedBy: allSocialMedias.mediaAssignedBy,
          postAssignedBy: allSocialMediaPost.postAssignedBy,
          postContentAssignedBy:
            allSocialMediaPostContent.postContentAssignedBy,
          createdBy: ele.createdBy,
        });
      }
    }
    allSocialMedia.map(async (data) => {
      let socialMediaUpdateStatus = await SocialMediaTable.findOne({
        where: { id: data.id },
      });

      await socialMediaUpdateStatus.update({ status: data.status });
    });
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
        fileRichText: ele.fileRichText,
        createdAt: ele.createdAt,
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
        addImage: allSocialMedias.addImage,
        extraImage: allSocialMedias.extraImage,
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

        mediaAssignedBy: allSocialMedias.mediaAssignedBy,
        postAssignedBy: allSocialMediaPost.postAssignedBy,
        postContentAssignedBy: allSocialMediaPostContent.postContentAssignedBy,
        createdBy: ele.createdBy,
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

// **********get social media task assignee baisi on the basis of projectId,socialMediaId   **********
exports.getSocialMediaByIdAssignee = async (req) => {
  const { projectId } = req.body;
  try {
    if (projectId == "" || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find social media
    let socialMediaElement = await SocialMediaTable.findAll({
      where: { projectId },
    });

    if (socialMediaElement == null) {
      return {
        data: null,
        error: null,
        message: "data not found.",
        statusCode: 200,
      };
    }

    const allAssigneeData = [];
    for (const data of socialMediaElement) {
      let allSocialMediaPostContent = await SocialMediaContent.findOne({
        where: { projectId: data.projectId, id: data.postContentId },
      });

      let allSocialMedias = await SocialMedia.findOne({
        where: { projectId: data.projectId, id: data.mediaId },
      });

      let allSocialMediaPost = await SocialMediaPost.findOne({
        where: { projectId: data.projectId, id: data.postId },
      });

      allAssigneeData.push({
        id: data.id,
        createdAt: data.createdAt,
        taskType: data.taskType,
        projectId: data.projectId,
        projectName: data.projectName,
        fileRichText: data.fileRichText,
        postContent: allSocialMediaPostContent.postContent,
        postContentType: allSocialMediaPostContent.postContentType,
        postContentAssignee: allSocialMediaPostContent.postContentAssignee,
        assignee: allSocialMediaPostContent.postContentAssignee,
        postContentPlateform: allSocialMediaPostContent.postContentPlateform,
        postContentStartDate: allSocialMediaPostContent.postContentStartDate,
        postContentDueDate: allSocialMediaPostContent.postContentDueDate,
        dueDate: allSocialMediaPostContent.postContentDueDate,
        postContentStatus: allSocialMediaPostContent.postContentStatus,
        status: allSocialMediaPostContent.postContentStatus,
        postContentTimeEstimation:
          allSocialMediaPostContent.postContentTimeEstimation,
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

        mediaAssignedBy: allSocialMedias.mediaAssignedBy,
        postAssignedBy: allSocialMediaPost.postAssignedBy,
        postContentAssignedBy: allSocialMediaPostContent.postContentAssignedBy,
        createdBy: ele.createdBy,
      });

      allAssigneeData.push({
        id: data.id,
        createdAt: data.createdAt,
        taskType: data.taskType,
        projectId: data.projectId,
        projectName: data.projectName,
        fileRichText: data.fileRichText,
        postContent: allSocialMediaPostContent.postContent,
        postContentType: allSocialMediaPostContent.postContentType,
        postContentAssignee: allSocialMediaPostContent.postContentAssignee,
        postContentPlateform: allSocialMediaPostContent.postContentPlateform,
        postContentStartDate: allSocialMediaPostContent.postContentStartDate,
        postContentDueDate: allSocialMediaPostContent.postContentDueDate,
        postContentStatus: allSocialMediaPostContent.postContentStatus,
        postContentTimeEstimation:
          allSocialMediaPostContent.postContentTimeEstimation,
        media: allSocialMedias.media,
        mediaAdditionalImage: allSocialMedias.mediaAdditionalImage,
        mediaAssignee: allSocialMedias.mediaAssignee,
        assignee: allSocialMedias.mediaAssignee,
        mediaImage: allSocialMedias.mediaImage,
        mediaStartDate: allSocialMedias.mediaStartDate,
        mediaDueDate: allSocialMedias.mediaDueDate,
        dueDate: allSocialMedias.mediaDueDate,
        mediaStatus: allSocialMedias.mediaStatus,
        status: allSocialMedias.mediaStatus,
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

        mediaAssignedBy: allSocialMedias.mediaAssignedBy,
        postAssignedBy: allSocialMediaPost.postAssignedBy,
        postContentAssignedBy: allSocialMediaPostContent.postContentAssignedBy,
        createdBy: ele.createdBy,
      });

      allAssigneeData.push({
        id: data.id,
        taskType: data.taskType,
        projectId: data.projectId,
        projectName: data.projectName,
        fileRichText: data.fileRichText,
        createdAt: data.createdAt,
        postContent: allSocialMediaPostContent.postContent,
        postContentType: allSocialMediaPostContent.postContentType,
        postContentAssignee: allSocialMediaPostContent.postContentAssignee,
        postContentPlateform: allSocialMediaPostContent.postContentPlateform,
        postContentStartDate: allSocialMediaPostContent.postContentStartDate,
        postContentDueDate: allSocialMediaPostContent.postContentDueDate,
        postContentStatus: allSocialMediaPostContent.postContentStatus,
        postContentTimeEstimation:
          allSocialMediaPostContent.postContentTimeEstimation,
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
        assignee: allSocialMediaPost.postAssignee,
        postSetTime: allSocialMediaPost.postSetTime,
        postSetDate: allSocialMediaPost.postSetDate,
        postStartDate: allSocialMediaPost.postStartDate,
        postDueDate: allSocialMediaPost.postDueDate,
        dueDate: allSocialMediaPost.postDueDate,
        postStatus: allSocialMediaPost.postStatus,
        status: allSocialMediaPost.postStatus,
        postTimeEstimation: allSocialMediaPost.postTimeEstimation,
        postTime: allSocialMediaPost.postTime,

        mediaAssignedBy: allSocialMedias.mediaAssignedBy,
        postAssignedBy: allSocialMediaPost.postAssignedBy,
        postContentAssignedBy: allSocialMediaPostContent.postContentAssignedBy,
        createdBy: ele.createdBy,
      });
    }

    const data = allAssigneeData;
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

// **********social media update status api controller**********
exports.updateSocialMediaTaskStatus = async (req) => {
  try {
    let {
      socialMediaId,
      projectId,
      postContentStatus,
      mediaStatus,
      postStatus,
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
    if (postContentStatus) {
      // find socialMedia
      let findSocialMedia = await SocialMediaTable.findOne({
        where: { id: socialMediaId, projectId },
      });
      // if socialMedia doesn't exist
      if (findSocialMedia == null) {
        return {
          data: null,
          error: "socialMedia  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let postContentTask = await SocialMediaContent.findOne({
        where: { id: findSocialMedia.postContentId, projectId },
      });

      // update socialMedia
      await postContentTask.update({
        postContentStatus,
      });

      return {
        data: "Status updated",
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    } else if (mediaStatus) {
      // find socialMedia
      let findSocialMedia = await SocialMediaTable.findOne({
        where: { id: socialMediaId, projectId },
      });
      // if socialMedia doesn't exist
      if (findSocialMedia == null) {
        return {
          data: null,
          error: "socialMedia  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let mediaTaks = await SocialMedia.findOne({
        where: { id: findSocialMedia.mediaId, projectId },
      });

      // update socialMedia
      await mediaTaks.update({
        mediaStatus,
      });

      return {
        data: "Status updated",
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    } else if (postStatus) {
      // find socialMedia
      let findSocialMedia = await SocialMediaTable.findOne({
        where: { id: socialMediaId, projectId },
      });

      // if socialMedia doesn't exist
      if (findSocialMedia == null) {
        return {
          data: null,
          error: "socialMedia  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let postTask = await SocialMediaPost.findOne({
        where: { id: findSocialMedia.postId, projectId },
      });

      // update socialMedia
      await postTask.update({
        postStatus,
      });

      return {
        data: "Status updated",
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// **********social media update time api controller**********
exports.updateSocialMediaTaskTime = async (req) => {
  try {
    let { socialMediaId, projectId, postContentTime, mediaTime, postTime } =
      req.body;

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
    if (postContentTime) {
      // find socialMedia
      let findSocialMedia = await SocialMediaTable.findOne({
        where: { id: socialMediaId, projectId },
      });
      // if socialMedia doesn't exist
      if (findSocialMedia == null) {
        return {
          data: null,
          error: "socialMedia  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let postContentTask = await SocialMediaContent.findOne({
        where: { id: findSocialMedia.postContentId, projectId },
      });
      const prevTime =
        postContentTask.postContentTime == "" ||
        postContentTask.postContentTime === null
          ? 0
          : postContentTask.postContentTime;
      const updateTime = parseInt(prevTime) + parseInt(postContentTime);

      // update socialMedia
      await postContentTask.update({
        postContentTime: updateTime,
      });

      return {
        data: "Time updated",
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    } else if (mediaTime) {
      // find socialMedia
      let findSocialMedia = await SocialMediaTable.findOne({
        where: { id: socialMediaId, projectId },
      });
      // if socialMedia doesn't exist
      if (findSocialMedia == null) {
        return {
          data: null,
          error: "socialMedia  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let mediaTaks = await SocialMedia.findOne({
        where: { id: findSocialMedia.mediaId, projectId },
      });

      const prevTime =
        mediaTaks.mediaTime == "" || mediaTaks.mediaTime === null
          ? 0
          : mediaTaks.mediaTime;
      const updateTime = parseInt(prevTime) + parseInt(mediaTime);

      // update socialMedia
      await mediaTaks.update({
        mediaTime: updateTime,
      });

      return {
        data: "Time updated",
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    } else if (postTime) {
      // find socialMedia
      let findSocialMedia = await SocialMediaTable.findOne({
        where: { id: socialMediaId, projectId },
      });

      // if socialMedia doesn't exist
      if (findSocialMedia == null) {
        return {
          data: null,
          error: "socialMedia  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let postTask = await SocialMediaPost.findOne({
        where: { id: findSocialMedia.postId, projectId },
      });
      const prevTime =
        postTask.postTime == "" || postTask.postTime === null
          ? 0
          : postTask.postTime;
      const updateTime = parseInt(prevTime) + parseInt(postTime);

      // update socialMedia
      await postTask.update({
        postTime: updateTime,
      });

      return {
        data: "Time updated",
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    }
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
