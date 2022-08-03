let db = require("../../../models");

const Blog = db.blogs;
const BlogTopic = db.blogtopics;
const BlogImage = db.blogimages;
const BlogUpload = db.bloguploads;
const Project = db.projects;
const Website = db.websites;
const ImageSize = db.imageSizes;
const Upload = db.uploads;
const Keyword = db.keywords;

// **********Blog create api controller**********
exports.blogCreate = async (req) => {
  try {
    let {
      fileRichText,
      topic,
      topicWebsite,
      topicAssignee,
      topicStartDate,
      topicDueDate,
      topicStatus,
      topicTimeEstimation,
      topicTime,
      topicKeyword,
      topicExtraKeyword,
      imageSize,
      imageAdditionalImage,
      imageAssignee,
      imageImage,
      imageStartDate,
      imageDueDate,
      imageStatus,
      imageTimeEstimation,
      imageTime,
      upload,
      uploadImageWithBlog,
      uploadAssignee,
      uploadStartDate,
      uploadDueDate,
      uploadStatus,
      uploadTimeEstimation,
      uploadTime,
      projectId,
      addImage,
      extraImage,
      createdBy,
      imageAssignedBy,
      topicAssignedBy,
      uploadAssignedBy,
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

    // find website
    let urlWebsite = await Website.findOne({
      where: { topicWebsite },
    });

    if (urlWebsite == null) {
      await Website.create({ topicWebsite });
    }

    // // find imageSize
    let urlImageSize = await ImageSize.findOne({
      where: { imageSize },
    });
    if (urlImageSize == null) {
      await ImageSize.create({ imageSize });
    }

    // // find upload
    // let urlUpload = await Upload.findOne({
    //   where: { upload },
    // });
    // if (urlUpload == null) {
    //   await Upload.create({ upload });
    // }

    // set dynamic status
    let DynamicTopicStatus;
    if (topicAssignee === "" || topicAssignee === undefined) {
      DynamicTopicStatus = "UNASSIGNED";
    } else if (topicStatus === "" || topicStatus === undefined) {
      DynamicTopicStatus = "PENDING";
    } else {
      DynamicTopicStatus = topicStatus;
    }

    // add blog topic information
    var blogTopicCreate = await BlogTopic.create({
      topic,
      topicWebsite,
      topicAssignee,
      topicStartDate,
      topicDueDate,
      projectId,
      topicStatus: DynamicTopicStatus,
      topicTimeEstimation,
      topicTime,
      topicKeyword,
      topicExtraKeyword,
      topicAssignedBy: topicAssignee === "" ? null : topicAssignedBy,
    });

    // set dynamic status
    let DynamicimageStatus;
    if (imageAssignee === "" || imageAssignee === undefined) {
      DynamicimageStatus = "UNASSIGNED";
    } else if (imageStatus === "" || imageStatus === undefined) {
      DynamicimageStatus = "PENDING";
    } else {
      DynamicimageStatus = imageStatus;
    }

    // add blog image information
    var blogImageCreate = await BlogImage.create({
      imageSize,
      imageAdditionalImage,
      imageAssignee,
      imageImage,
      imageStartDate,
      imageDueDate,
      projectId,
      imageStatus: DynamicimageStatus,
      imageTimeEstimation,
      imageTime,
      addImage,
      extraImage,
      imageAssignedBy: imageAssignee === "" ? null : imageAssignedBy,
    });

    // set dynamic status
    let DynamicuploadStatus;
    if (uploadAssignee === "" || uploadAssignee === undefined) {
      DynamicuploadStatus = "UNASSIGNED";
    } else if (uploadStatus === "" || uploadStatus === undefined) {
      DynamicuploadStatus = "PENDING";
    } else {
      DynamicuploadStatus = uploadStatus;
    }

    // add blog upload information
    var blogUploadCreate = await BlogUpload.create({
      upload,
      uploadImageWithBlog,
      uploadAssignee,
      uploadStartDate,
      uploadDueDate,
      projectId,
      uploadStatus: DynamicuploadStatus,
      uploadTimeEstimation,
      uploadTime,
      uploadAssignedBy: uploadAssignee === "" ? null : uploadAssignedBy,
    });

    const topicId = blogTopicCreate.dataValues.id;
    const imageSizeId = blogImageCreate.dataValues.id;
    const uploadId = blogUploadCreate.dataValues.id;

    // create blog
    var blogCreate = await Blog.create({
      fileRichText,
      topicId,
      imageSizeId,
      uploadId,
      projectId,
      taskType: "BLOG",
      projectName: projectFind.dataValues.projectName,
      status: "PROCESSING",
      createdBy,
    });
    // find keyword
    // let keywordFind = await Keyword.findOne({
    //   where: { keyword: topicKeyword },
    // });
    // if (keywordFind == null) {
    //   await Keyword.create({ keyword: topicKeyword, projectId });
    // }

    return {
      data: blogCreate,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********blog update api controller**********
exports.blogUpdate = async (req) => {
  try {
    let {
      blogId,
      projectId,
      topic,
      fileRichText,
      topicWebsite,
      topicAssignee,
      topicStartDate,
      topicDueDate,
      topicStatus,
      topicTimeEstimation,
      topicTime,
      topicKeyword,
      imageSize,
      imageAdditionalImage,
      imageAssignee,
      imageImage,
      imageStartDate,
      imageDueDate,
      imageStatus,
      imageTimeEstimation,
      imageTime,
      upload,
      uploadImageWithBlog,
      uploadAssignee,
      uploadStartDate,
      uploadDueDate,
      uploadStatus,
      uploadTimeEstimation,
      uploadTime,
      addImage,
      extraImage,
      topicExtraKeyword,
      imageAssignedBy,
      topicAssignedBy,
      uploadAssignedBy,
    } = req.body;

    if (blogId == "" || projectId == "" || !blogId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }

    // find blog
    let blogFind = await Blog.findOne({
      where: { id: blogId },
    });

    // if blog doesn't exist
    if (blogFind == null) {
      return {
        data: null,
        error: "Blog doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    await blogFind.update({ fileRichText });

    // find blog Topic
    let blogTopicFind = await BlogTopic.findOne({
      where: { id: blogFind.dataValues.topicId },
    });

    // if blog topic doesn't exist
    if (blogTopicFind == null) {
      return {
        data: null,
        error: "BlogTopic doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find website
    let urlWebsite = await Website.findOne({
      where: { topicWebsite },
    });

    if (urlWebsite == null) {
      await Website.create({ topicWebsite });
    }

    // // find imageSize
    let urlImageSize = await ImageSize.findOne({
      where: { imageSize },
    });
    if (urlImageSize == null) {
      await ImageSize.create({ imageSize });
    }

    // find upload
    // let urlUpload = await Upload.findOne({
    //   where: { upload },
    // });
    // if (urlUpload == null) {
    //   await Upload.create({ upload });
    // }

    // update blog topic
    await blogTopicFind.update({
      topic,
      topicWebsite,
      topicAssignee,
      topicStartDate,
      topicStatus,
      topicTime,
      topicDueDate,
      topicTimeEstimation,
      topicKeyword,
      topicExtraKeyword,
      topicAssignedBy:
        blogTopicFind.topicAssignee === topicAssignee
          ? blogTopicFind.topicAssignedBy
          : topicAssignedBy,
    });

    // find blog imageSize
    let blogImageSizeFind = await BlogImage.findOne({
      where: { id: blogFind.dataValues.imageSizeId },
    });

    // if blog imageSize doesn't exist
    if (blogImageSizeFind == null) {
      return {
        data: null,
        error: "Blog imageSize doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update blog topic
    await blogImageSizeFind.update({
      imageSize,
      imageAdditionalImage,
      imageAssignee,
      imageImage,
      imageStartDate,
      imageStatus,
      imageDueDate,
      imageTimeEstimation,
      imageTime,
      addImage,
      extraImage,
      imageAssignedBy:
        blogImageSizeFind.imageAssignee === imageAssignee
          ? blogImageSizeFind.imageAssignedBy
          : imageAssignedBy,
    });

    // find blog upload
    let blogUploadFind = await BlogUpload.findOne({
      where: { id: blogFind.dataValues.uploadId },
    });

    // if blog upload doesn't exist
    if (blogUploadFind == null) {
      return {
        data: null,
        error: "Blog upload doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update blog upload
    await blogUploadFind.update({
      upload,
      uploadImageWithBlog,
      uploadAssignee,
      uploadStartDate,
      uploadDueDate,
      uploadTimeEstimation,
      uploadTime,
      uploadStatus,
      uploadAssignedBy:
        blogUploadFind.uploadAssignee === uploadAssignee
          ? blogUploadFind.uploadAssignedBy
          : uploadAssignedBy,
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

// **********get all Blog api controller**********
exports.getAllBlogs = async (req) => {
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
    // find all Blog
    let allBlogs = await Blog.findAll({ where: { projectId } });
    const blogLength = allBlogs.length;

    const allBlog = [];

    // get today date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    today = new Date(today);

    for (let index = 0; index < blogLength; index++) {
      const element = allBlogs[index];
      const allBlogElement = [element];
      // update status dynamic
      for (const ele of allBlogElement) {
        let allBlogTopic = await BlogTopic.findOne({
          where: { id: ele.topicId },
        });
        let overTopicDate = new Date(allBlogTopic.topicDueDate);

        if (
          overTopicDate < today &&
          allBlogTopic.topicStatus != "ONHOLD" &&
          allBlogTopic.topicStatus != "ONHOLD" &&
          allBlogTopic.topicStatus != "UNASSIGNED" &&
          allBlogTopic.topicStatus != "COMPLETE" &&
          allBlogTopic.topicStatus != "PROCESSING"
          //  &&
          // allBlogTopic.status != "PROCESSING"
        ) {
          await allBlogTopic.update({ topicStatus: "DELAY" });
        }

        let allBlogImage = await BlogImage.findOne({
          where: { id: ele.imageSizeId },
        });
        // image status update dynamic
        let overImageDate = new Date(allBlogImage.imageDueDate);
        if (
          overImageDate < today &&
          allBlogImage.imageStatus != "ONHOLD" &&
          allBlogImage.imageStatus != "ONHOLD" &&
          allBlogImage.imageStatus != "UNASSIGNED" &&
          allBlogImage.imageStatus != "COMPLETE" &&
          allBlogImage.imageStatus != "PROCESSING"
          // &&
          // allBlogImage.imageStatus != "PROCESSING"
        ) {
          await allBlogImage.update({ imageStatus: "DELAY" });
        }
        let allBlogUpload = await BlogUpload.findOne({
          where: { id: ele.uploadId },
        });
        // update status dynamic
        let overuploadDate = new Date(allBlogUpload.uploadDueDate);
        if (
          overuploadDate < today &&
          allBlogUpload.uploadStatus != "ONHOLD" &&
          allBlogUpload.uploadStatus != "ONHOLD" &&
          allBlogUpload.uploadStatus != "UNASSIGNED" &&
          allBlogUpload.uploadStatus != "COMPLETE" &&
          allBlogUpload.uploadStatus != "PROCESSING"
          // &&
          // allBlogUpload.uploadStatus != "PROCESSING"
        ) {
          await allBlogUpload.update({ uploadStatus: "DELAY" });
        }

        allBlog.push({
          id: ele.id,
          fileRichText: ele.fileRichText,
          projectId: ele.projectId,
          projectName: ele.projectName,
          createdAt: ele.createdAt,
          topic: allBlogTopic.topic,
          taskType: ele.taskType,
          topicId: allBlogTopic.id,
          topicWebsite: allBlogTopic.topicWebsite,
          topicStatus: allBlogTopic.topicStatus,
          topicAssignee: allBlogTopic.topicAssignee,
          topicStartDate: allBlogTopic.topicStartDate,
          topicDueDate: allBlogTopic.topicDueDate,
          topicTimeEstimation: allBlogTopic.topicTimeEstimation,
          topicKeyword: allBlogTopic.topicKeyword,
          topicExtraKeyword: allBlogTopic.topicExtraKeyword,
          imageSize: allBlogImage.imageSize,
          imageId: allBlogImage.id,
          imageAdditionalImage: allBlogImage.imageAdditionalImage,
          imageAssignee: allBlogImage.imageAssignee,
          imageImage: allBlogImage.imageImage,
          imageStartDate: allBlogImage.imageStartDate,
          imageDueDate: allBlogImage.imageDueDate,
          imageStatus: allBlogImage.imageStatus,
          imageTimeEstimation: allBlogImage.imageTimeEstimation,
          imageTime: allBlogImage.imageTime,
          addImage: allBlogImage.addImage,
          extraImage: allBlogImage.extraImage,
          upload: allBlogUpload.upload,
          uploadId: allBlogUpload.id,
          uploadImageWithBlog: allBlogUpload.uploadImageWithBlog,
          uploadAssignee: allBlogUpload.uploadAssignee,
          uploadStartDate: allBlogUpload.uploadStartDate,
          uploadDueDate: allBlogUpload.uploadDueDate,
          uploadStatus: allBlogUpload.uploadStatus,
          uploadTimeEstimation: allBlogUpload.uploadTimeEstimation,
          uploadTime: allBlogUpload.uploadTime,

          imageAssignedBy: allBlogImage.imageAssignedBy,
          topicAssignedBy: allBlogTopic.topicAssignedBy,
          uploadAssignedBy: allBlogUpload.uploadAssignedBy,
          createdBy: ele.createdBy,
        });
      }
    }

    return {
      data: allBlog,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get blog task on the basis of projectId,blogId  **********
exports.getBlogById = async (req) => {
  const { blogId, projectId } = req.body;
  try {
    if (blogId == "" || projectId == "" || !blogId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    // find blog
    let allBlog = await Blog.findAll({
      where: { id: blogId, projectId },
    });

    const blogById = [];
    for (const ele of allBlog) {
      let allBlogTopic = await BlogTopic.findOne({
        where: { id: ele.topicId },
      });
      let allBlogImage = await BlogImage.findOne({
        where: { id: ele.imageSizeId },
      });
      let allBlogUpload = await BlogUpload.findOne({
        where: { id: ele.uploadId },
      });
      blogById.push({
        id: ele.id,
        projectId: ele.projectId,
        projectName: ele.projectName,
        fileRichText: ele.fileRichText,
        createdAt: ele.createdAt,
        topic: allBlogTopic.topic,
        topicWebsite: allBlogTopic.topicWebsite,
        topicStatus: allBlogTopic.topicStatus,
        topicAssignee: allBlogTopic.topicAssignee,
        topicStartDate: allBlogTopic.topicStartDate,
        topicDueDate: allBlogTopic.topicDueDate,
        topicTimeEstimation: allBlogTopic.topicTimeEstimation,
        topicKeyword: allBlogTopic.topicKeyword,
        topicExtraKeyword: allBlogTopic.topicExtraKeyword,
        imageSize: allBlogImage.imageSize,
        imageAdditionalImage: allBlogImage.imageAdditionalImage,
        imageAssignee: allBlogImage.imageAssignee,
        imageImage: allBlogImage.imageImage,
        imageStartDate: allBlogImage.imageStartDate,
        imageDueDate: allBlogImage.imageDueDate,
        imageStatus: allBlogImage.imageStatus,
        imageTimeEstimation: allBlogImage.imageTimeEstimation,
        imageTime: allBlogImage.imageTime,
        addImage: allBlogImage.addImage,
        extraImage: allBlogImage.extraImage,
        upload: allBlogUpload.upload,
        uploadImageWithBlog: allBlogUpload.uploadImageWithBlog,
        uploadAssignee: allBlogUpload.uploadAssignee,
        uploadStartDate: allBlogUpload.uploadStartDate,
        uploadDueDate: allBlogUpload.uploadDueDate,
        uploadStatus: allBlogUpload.uploadStatus,
        uploadTimeEstimation: allBlogUpload.uploadTimeEstimation,
        uploadTime: allBlogUpload.uploadTime,

        imageAssignedBy: allBlogImage.imageAssignedBy,
        topicAssignedBy: allBlogTopic.topicAssignedBy,
        uploadAssignedBy: allBlogUpload.uploadAssignedBy,
        createdBy: ele.createdBy,
      });
    }

    const data = blogById;
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
// **********get blog task on the basis of projectId,blogId  **********
exports.getBlogByIdAssignee = async (req) => {
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
    // find blog
    let allBlog = await Blog.findAll({
      where: { projectId },
    });

    const allAssignee = [];
    // const blogById = [];
    for (const data of allBlog) {
      let allBlogTopic = await BlogTopic.findOne({
        where: { projectId: data.projectId, id: data.topicId },
      });
      let allBlogImage = await BlogImage.findOne({
        where: { projectId: data.projectId, id: data.imageSizeId },
      });
      let allBlogUpload = await BlogUpload.findOne({
        where: { projectId: data.projectId, id: data.uploadId },
      });

      allAssignee.push({
        id: data.id,
        projectId: data.projectId,
        projectName: data.projectName,
        fileRichText: data.fileRichText,
        createdAt: data.createdAt,
        taskType: data.taskType,
        topicId: allBlogTopic.id,
        topic: allBlogTopic.topic,
        topicWebsite: allBlogTopic.topicWebsite,
        topicStatus: allBlogTopic.topicStatus,
        topicKeyword: allBlogTopic.topicKeyword,
        status: allBlogTopic.topicStatus,
        topicAssignee: allBlogTopic.topicAssignee,
        assignee: allBlogTopic.topicAssignee,
        topicStartDate: allBlogTopic.topicStartDate,
        topicDueDate: allBlogTopic.topicDueDate,
        addImage: allBlogImage.addImage,
        extraImage: allBlogImage.extraImage,
        dueDate: allBlogTopic.topicDueDate,
        topicTimeEstimation: allBlogTopic.topicTimeEstimation,
        imageId: allBlogImage.id,
        imageSize: allBlogImage.imageSize,
        imageAdditionalImage: allBlogImage.imageAdditionalImage,
        imageAssignee: allBlogImage.imageAssignee,
        imageImage: allBlogImage.imageImage,
        imageStartDate: allBlogImage.imageStartDate,
        imageDueDate: allBlogImage.imageDueDate,
        imageStatus: allBlogImage.imageStatus,
        imageTimeEstimation: allBlogImage.imageTimeEstimation,
        imageTime: allBlogImage.imageTime,
        addImage: allBlogImage.addImage,
        extraImage: allBlogImage.extraImage,
        uploadId: allBlogUpload.id,
        upload: allBlogUpload.upload,
        uploadImageWithBlog: allBlogUpload.uploadImageWithBlog,
        uploadAssignee: allBlogUpload.uploadAssignee,
        uploadStartDate: allBlogUpload.uploadStartDate,
        uploadDueDate: allBlogUpload.uploadDueDate,
        uploadStatus: allBlogUpload.uploadStatus,
        uploadTimeEstimation: allBlogUpload.uploadTimeEstimation,
        uploadTime: allBlogUpload.uploadTime,

        imageAssignedBy: allBlogImage.imageAssignedBy,
        topicAssignedBy: allBlogTopic.topicAssignedBy,
        uploadAssignedBy: allBlogUpload.uploadAssignedBy,
        createdBy: data.createdBy,
      });

      allAssignee.push({
        id: data.id,
        projectId: data.projectId,
        projectName: data.projectName,
        fileRichText: data.fileRichText,
        createdAt: data.createdAt,
        taskType: data.taskType,
        topicId: allBlogTopic.id,
        topic: allBlogTopic.topic,
        topicWebsite: allBlogTopic.topicWebsite,
        topicStatus: allBlogTopic.topicStatus,
        topicAssignee: allBlogTopic.topicAssignee,
        topicStartDate: allBlogTopic.topicStartDate,
        topicDueDate: allBlogTopic.topicDueDate,
        addImage: allBlogImage.addImage,
        extraImage: allBlogImage.extraImage,
        topicTimeEstimation: allBlogTopic.topicTimeEstimation,
        topicKeyword: allBlogTopic.topicKeyword,
        imageId: allBlogImage.id,
        imageSize: allBlogImage.imageSize,
        imageAdditionalImage: allBlogImage.imageAdditionalImage,
        imageAssignee: allBlogImage.imageAssignee,
        assignee: allBlogImage.imageAssignee,
        imageImage: allBlogImage.imageImage,
        imageStartDate: allBlogImage.imageStartDate,
        imageDueDate: allBlogImage.imageDueDate,
        dueDate: allBlogImage.imageDueDate,
        imageStatus: allBlogImage.imageStatus,
        addImage: allBlogImage.addImage,
        extraImage: allBlogImage.extraImage,
        status: allBlogImage.imageStatus,
        imageTimeEstimation: allBlogImage.imageTimeEstimation,
        imageTime: allBlogImage.imageTime,
        uploadId: allBlogUpload.id,
        upload: allBlogUpload.upload,
        uploadImageWithBlog: allBlogUpload.uploadImageWithBlog,
        uploadAssignee: allBlogUpload.uploadAssignee,
        uploadStartDate: allBlogUpload.uploadStartDate,
        uploadDueDate: allBlogUpload.uploadDueDate,
        uploadStatus: allBlogUpload.uploadStatus,
        uploadTimeEstimation: allBlogUpload.uploadTimeEstimation,
        uploadTime: allBlogUpload.uploadTime,

        imageAssignedBy: allBlogImage.imageAssignedBy,
        topicAssignedBy: allBlogTopic.topicAssignedBy,
        uploadAssignedBy: allBlogUpload.uploadAssignedBy,
        createdBy: data.createdBy,
      });

      allAssignee.push({
        id: data.id,
        projectId: data.projectId,
        projectName: data.projectName,
        fileRichText: data.fileRichText,
        createdAt: data.createdAt,
        taskType: data.taskType,
        topicId: allBlogTopic.id,
        topic: allBlogTopic.topic,
        topicWebsite: allBlogTopic.topicWebsite,
        topicStatus: allBlogTopic.topicStatus,
        topicAssignee: allBlogTopic.topicAssignee,
        addImage: allBlogImage.addImage,
        extraImage: allBlogImage.extraImage,
        topicStartDate: allBlogTopic.topicStartDate,
        topicDueDate: allBlogTopic.topicDueDate,
        topicTimeEstimation: allBlogTopic.topicTimeEstimation,
        topicKeyword: allBlogTopic.topicKeyword,
        imageId: allBlogImage.id,
        imageSize: allBlogImage.imageSize,
        imageAdditionalImage: allBlogImage.imageAdditionalImage,
        imageAssignee: allBlogImage.imageAssignee,
        imageImage: allBlogImage.imageImage,
        imageStartDate: allBlogImage.imageStartDate,
        imageDueDate: allBlogImage.imageDueDate,
        imageStatus: allBlogImage.imageStatus,
        imageTimeEstimation: allBlogImage.imageTimeEstimation,
        imageTime: allBlogImage.imageTime,
        addImage: allBlogImage.addImage,
        extraImage: allBlogImage.extraImage,
        uploadId: allBlogUpload.id,
        upload: allBlogUpload.upload,
        uploadImageWithBlog: allBlogUpload.uploadImageWithBlog,
        uploadAssignee: allBlogUpload.uploadAssignee,
        assignee: allBlogUpload.uploadAssignee,
        uploadStartDate: allBlogUpload.uploadStartDate,
        uploadDueDate: allBlogUpload.uploadDueDate,
        dueDate: allBlogUpload.uploadDueDate,
        uploadStatus: allBlogUpload.uploadStatus,
        status: allBlogUpload.uploadStatus,
        uploadTimeEstimation: allBlogUpload.uploadTimeEstimation,
        uploadTime: allBlogUpload.uploadTime,

        imageAssignedBy: allBlogImage.imageAssignedBy,
        topicAssignedBy: allBlogTopic.topicAssignedBy,
        uploadAssignedBy: allBlogUpload.uploadAssignedBy,
        createdBy: data.createdBy,
      });
    }

    return {
      data: allAssignee,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********blog update status api controller**********
exports.updateBlogTaskStatus = async (req) => {
  try {
    let { blogId, projectId, topicStatus, imageStatus, uploadStatus } =
      req.body;

    if (blogId == "" || projectId == "" || !blogId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    if (topicStatus) {
      // find blog
      let findBlog = await Blog.findOne({
        where: { id: blogId, projectId },
      });
      // if blog doesn't exist
      if (findBlog == null) {
        return {
          data: null,
          error: "blog  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let topicTask = await BlogTopic.findOne({
        where: { id: findBlog.topicId, projectId },
      });

      // update blog
      await topicTask.update({
        topicStatus,
      });

      return {
        data: "Status updated",
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    } else if (imageStatus) {
      // find blog
      let findBlog = await Blog.findOne({
        where: { id: blogId, projectId },
      });

      // if blog doesn't exist
      if (findBlog == null) {
        return {
          data: null,
          error: "blog  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let imageTask = await BlogImage.findOne({
        where: { id: findBlog.imageSizeId, projectId },
      });

      // update blog
      await imageTask.update({
        imageStatus,
      });

      return {
        data: "Status updated",
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    } else if (uploadStatus) {
      // find blog
      let findBlog = await Blog.findOne({
        where: { id: blogId, projectId },
      });

      // if blog doesn't exist
      if (findBlog == null) {
        return {
          data: null,
          error: "blog  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let uploadTask = await BlogUpload.findOne({
        where: { id: findBlog.imageSizeId, projectId },
      });

      // update blog
      await uploadTask.update({
        uploadStatus,
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

// **********blog update time api controller**********
exports.updateBlogTimer = async (req) => {
  try {
    let { blogId, projectId, topicTime, imageTime, uploadTime } = req.body;

    if (blogId == "" || projectId == "" || !blogId || !projectId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        StatusCode: 400,
      };
    }
    if (topicTime) {
      // find blog
      let findBlog = await Blog.findOne({
        where: { id: blogId, projectId },
      });
      // if blog doesn't exist
      if (findBlog == null) {
        return {
          data: null,
          error: "blog  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let topicTask = await BlogTopic.findOne({
        where: { id: findBlog.topicId, projectId },
      });
      const prevTime =
        topicTask.topicTime == "" || topicTask.topicTime === null
          ? 0
          : topicTask.topicTime;
      const updateTime = parseInt(prevTime) + parseInt(topicTime);

      // update blog
      await topicTask.update({
        topicTime: updateTime,
      });

      return {
        data: "Time updated",
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    } else if (imageTime) {
      // find blog
      let findBlog = await Blog.findOne({
        where: { id: blogId, projectId },
      });

      // if blog doesn't exist
      if (findBlog == null) {
        return {
          data: null,
          error: "blog  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let imageTask = await BlogImage.findOne({
        where: { id: findBlog.imageSizeId, projectId },
      });
      const prevTime =
        imageTask.imageTime == "" || imageTask.imageTime === null
          ? 0
          : imageTask.imageTime;
      const updateTime = parseInt(prevTime) + parseInt(imageTime);
      // update blog
      await imageTask.update({
        imageTime: updateTime,
      });

      return {
        data: "Time updated",
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    } else if (uploadTime) {
      // find blog
      let findBlog = await Blog.findOne({
        where: { id: blogId, projectId },
      });

      // if blog doesn't exist
      if (findBlog == null) {
        return {
          data: null,
          error: "blog  doesn't exist",
          message: "Failed",
          statusCode: 400,
        };
      }
      let uploadTask = await BlogUpload.findOne({
        where: { id: findBlog.imageSizeId, projectId },
      });
      const prevTime =
        uploadTask.uploadTime == "" || uploadTask.uploadTime === null
          ? 0
          : uploadTask.uploadTime;
      const updateTime = parseInt(prevTime) + parseInt(uploadTime);

      // update blog
      await uploadTask.update({
        uploadTime: updateTime,
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

// **********delete Blog api by id controller**********
exports.deleteBlog = async (req) => {
  try {
    let { blogId } = req.body;
    if (blogId == "" || !blogId) {
      return {
        data: null,
        error: "something went wrong",
        message: "Failed",
        statusCode: 400,
      };
    }
    let findBlog = await Blog.findOne({ where: { id: blogId } });
    // if Blog doesn't exist
    if (findBlog == null) {
      return {
        data: null,
        error: "Blog doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    } else {
      // if exist delete them
      let deleteBlog = await Blog.destroy({
        where: { id: findBlog.dataValues.id },
      });
      await BlogTopic.destroy({
        where: { id: findBlog.dataValues.topicId },
      });
      await BlogImage.destroy({
        where: { id: findBlog.dataValues.imageSizeId },
      });
      await BlogUpload.destroy({
        where: { id: findBlog.dataValues.uploadId },
      });

      return {
        data: deleteBlog,
        error: null,
        message: "SUCCESS",
        statusCode: 200,
      };
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
