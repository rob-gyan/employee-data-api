"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");
const fileUpload = require("express-fileupload");

// all routes digital marketing
const userRoutes = require("./routes/user/userRoutes");
const projectRoutes = require("./routes/project/projectRoutes");
const backlinkRoutes = require("./routes/project/backlink/backlinkRoutes");
const blogRoutes = require("./routes/project/blogs/blogRoutes");
const fourmRoutes = require("./routes/project/fourms/fourmRoutes");
const discussionRoutes = require("./routes/project/discussion/discussionRoutes");
const socialBookRoutes = require("./routes/project/socialBook/socialbookRoutes");
const socialMediaRoutes = require("./routes/project/socialMedia/socialMediaRoutes");
const seoRouteRoutes = require("./routes/project/seoAudit/seoauditRoutes");

// all routes development
const developmentProjectRoutes = require("./routes/development-project/projectRoutes");
const designRoutes = require("./routes/development-project/design/designRoutes");
const rdTaskRoutes = require("./routes/development-project/rd-tasks/rdTasks");
const developmentRoutes = require("./routes/development-project/development/developmentRoutes");
const testingRoutes = require("./routes/development-project/testing/testingRoutes");
const developmentDiscussionRoutes = require("./routes/development-project/development-discussion/discussionRoutes");

const app = express();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// setup route middlewares
var csrfProtection = csrf({ cookie: true });

var parseForm = bodyParser.urlencoded({ extended: false });

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/v1/getCSRF", csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.send({ csrfToken: req.csrfToken() });
});

app.post("/process", parseForm, csrfProtection, function (req, res) {
  res.send("data is authenticated with csurf TOKEN");
});

// all routes path
app.use("/api/v1", userRoutes);
app.use("/api/v1", projectRoutes);
app.use("/api/v1", backlinkRoutes);
app.use("/api/v1", blogRoutes);
app.use("/api/v1", fourmRoutes);
app.use("/api/v1", discussionRoutes);
app.use("/api/v1", socialBookRoutes);
app.use("/api/v1", socialMediaRoutes);
app.use("/api/v1", seoRouteRoutes);

// all development routes path
app.use("/api/v1/development", developmentProjectRoutes);
app.use("/api/v1/development", developmentDiscussionRoutes);
app.use("/api/v1/development", designRoutes);
app.use("/api/v1/development", rdTaskRoutes);
app.use("/api/v1/development", developmentRoutes);
app.use("/api/v1/development", testingRoutes);

app.listen(config.port, () => {
  console.log("app listening on url http://localhost:" + config.port);
});
