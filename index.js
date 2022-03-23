"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");
const fileUpload = require("express-fileupload");

// all routes
const userRoutes = require("./routes/user/userRoutes");
const projectRoutes = require("./routes/project/projectRoutes");
const backlinkRoutes = require("./routes/project/backlink/backlinkRoutes");
const blogRoutes = require("./routes/project/blogs/blogRoutes");
const fourmRoutes = require("./routes/project/fourms/fourmRoutes");
const discussionRoutes = require("./routes/project/discussion/discussionRoutes");
const socialBookRoutes = require("./routes/project/socialBook/socialbookRoutes");
const socialMediaRoutes = require("./routes/project/socialMedia/socialMediaRoutes");
const seoRouteRoutes = require("./routes/project/seoAudit/seoauditRoutes");

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

app.get("/form", csrfProtection, function (req, res) {
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

app.listen(config.port, () => {
  console.log("app listening on url http://localhost:" + config.port);
});
