let db = require("../../../models");

const Blog = db.blogs;
const BlogTopic = db.blogtopics;
const BlogImage = db.blogimages;
const BlogUpload = db.bloguploads;
const Project = db.projects;
const Website = db.websites;
const ImageSize = db.imageSizes;
const Upload = db.uploads;

// **********Blog create api controller**********
exports.blogCreate = async (req) => {
  try {
    let {
      topic,
      topicWebsite,
      topicAssignee,
      topicStartDate,
      topicDueDate,
      topicStatus,
      topicTimeEstimation,
      topicTime,
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

    // find upload
    let urlUpload = await Upload.findOne({
      where: { upload },
    });
    if (urlUpload == null) {
      await Upload.create({ upload });
    }

    // add blog topic information
    var blogTopicCreate = await BlogTopic.create({
      topic,
      topicWebsite,
      topicAssignee,
      topicStartDate,
      topicDueDate,
      projectId,
      topicStatus,
      topicTimeEstimation,
      topicTime,
    });

    // add blog image information
    var blogImageCreate = await BlogImage.create({
      imageSize,
      imageAdditionalImage,
      imageAssignee,
      imageImage,
      imageStartDate,
      imageDueDate,
      projectId,
      imageStatus,
      imageTimeEstimation,
      imageTime,
    });

    // add blog upload information
    var blogUploadCreate = await BlogUpload.create({
      upload,
      uploadImageWithBlog,
      uploadAssignee,
      uploadStartDate,
      uploadDueDate,
      projectId,
      uploadStatus,
      uploadTimeEstimation,
      uploadTime,
    });

    const topicId = blogTopicCreate.dataValues.id;
    const imageSizeId = blogImageCreate.dataValues.id;
    const uploadId = blogUploadCreate.dataValues.id;

    // create blog
    var blogCreate = await Blog.create({
      topicId,
      imageSizeId,
      uploadId,
      projectId,
      taskType: "BLOG",
      projectName: projectFind.dataValues.projectName,
      status: "PROCESSING",
    });

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
      topicWebsite,
      topicAssignee,
      topicStartDate,
      topicDueDate,
      topicStatus,
      topicTimeEstimation,
      topicTime,
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

    // find blog Topic
    let blogTopicFind = await BlogTopic.findOne({
      where: { id: blogFind.dataValues.topicId },
    });
    // console.log(blogTopicFind.topicStatus);

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
    let urlUpload = await Upload.findOne({
      where: { upload },
    });
    if (urlUpload == null) {
      await Upload.create({ upload });
    }
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
    });

    // find blog upload
    let blogUploadFind = await BlogImage.findOne({
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
    for (let index = 0; index < blogLength; index++) {
      const element = allBlogs[index];
      const allBlogElement = [element];

      for (const ele of allBlogElement) {
        let allBlogTopic = await BlogTopic.findOne({
          where: { id: ele.topicId },
        });
        let allBlogImage = await BlogImage.findOne({
          where: { id: ele.imageSizeId },
        });
        let allBlogUpload = await BlogUpload.findOne({
          where: { id: ele.uploadId },
        });

        allBlog.push({
          id: ele.id,
          projectId: ele.projectId,
          projectName: ele.projectName,
          topic: allBlogTopic.topic,
          taskType: ele.taskType,
          topicWebsite: allBlogTopic.topicWebsite,
          topicStatus: allBlogTopic.topicStatus,
          topicAssignee: allBlogTopic.topicAssignee,
          topicStartDate: allBlogTopic.topicStartDate,
          topicDueDate: allBlogTopic.topicDueDate,
          topicTimeEstimation: allBlogTopic.topicTimeEstimation,
          imageSize: allBlogImage.imageSize,
          imageAdditionalImage: allBlogImage.imageAdditionalImage,
          imageAssignee: allBlogImage.imageAssignee,
          imageImage: allBlogImage.imageImage,
          imageStartDate: allBlogImage.imageStartDate,
          imageDueDate: allBlogImage.imageDueDate,
          imageStatus: allBlogImage.imageStatus,
          imageTimeEstimation: allBlogImage.imageTimeEstimation,
          imageTime: allBlogImage.imageTime,
          upload: allBlogUpload.upload,
          uploadImageWithBlog: allBlogUpload.uploadImageWithBlog,
          uploadAssignee: allBlogUpload.uploadAssignee,
          uploadStartDate: allBlogUpload.uploadStartDate,
          uploadDueDate: allBlogUpload.uploadDueDate,
          uploadStatus: allBlogUpload.uploadStatus,
          uploadTimeEstimation: allBlogUpload.uploadTimeEstimation,
          uploadTime: allBlogUpload.uploadTime,
          status:
            allBlogTopic.topicStatus == "COMPLETE"
              ? "COMPLETE"
              : allBlogImage.imageStatus == "COMPLETE"
              ? "COMPLETE"
              : allBlogUpload.uploadStatus == "COMPLETE"
              ? "COMPLETE"
              : "PENDING",
        });
      }
    }
    allBlog.map(async (data) => {
      let blogUpdateStatus = await Blog.findOne({
        where: { id: data.id },
      });
      await blogUpdateStatus.update({ status: data.status });
    });

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
        topic: allBlogTopic.topic,
        topicWebsite: allBlogTopic.topicWebsite,
        topicStatus: allBlogTopic.topicStatus,
        topicAssignee: allBlogTopic.topicAssignee,
        topicStartDate: allBlogTopic.topicStartDate,
        topicDueDate: allBlogTopic.topicDueDate,
        topicTimeEstimation: allBlogTopic.topicTimeEstimation,
        imageSize: allBlogImage.imageSize,
        imageAdditionalImage: allBlogImage.imageAdditionalImage,
        imageAssignee: allBlogImage.imageAssignee,
        imageImage: allBlogImage.imageImage,
        imageStartDate: allBlogImage.imageStartDate,
        imageDueDate: allBlogImage.imageDueDate,
        imageStatus: allBlogImage.imageStatus,
        imageTimeEstimation: allBlogImage.imageTimeEstimation,
        imageTime: allBlogImage.imageTime,
        upload: allBlogUpload.upload,
        uploadImageWithBlog: allBlogUpload.uploadImageWithBlog,
        uploadAssignee: allBlogUpload.uploadAssignee,
        uploadStartDate: allBlogUpload.uploadStartDate,
        uploadDueDate: allBlogUpload.uploadDueDate,
        uploadStatus: allBlogUpload.uploadStatus,
        uploadTimeEstimation: allBlogUpload.uploadTimeEstimation,
        uploadTime: allBlogUpload.uploadTime,
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
