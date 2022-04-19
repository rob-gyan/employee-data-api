let db = require("../../../models");

const SeoAuditTable = db.seoaudittables;
const SeoAudit = db.seoaudits;
const Project = db.projects;

// **********seoAudit update api controller**********
exports.seoAuditUpdate = async (req) => {
  try {
    let {
      projectType,
      checkQuestion,
      projectId,
      grading,
      assign,
      reassign,
      date,
      status,
      timeEstimation,
      time,
      topKey,
      amount,
      note,
      startDate,
      dueDate,
    } = req.body;

    let updateSeoAudit;

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

    // find seoAudit
    let seoAuditFind = await SeoAudit.findOne({
      where: { checkQuestion },
    });

    if (seoAuditFind == null) {
      updateSeoAudit = await SeoAudit.create({
        projectType,
        checkQuestion,
        grading,
        assign,
        reassign,
        date,
        status,
        timeEstimation,
        time,
        projectId,
        topKey,
        amount,
        startDate,
        dueDate,
        note,
        taskType: "SEOAUDIT",
        projectName: projectFind.dataValues.projectName,
      });
    } else {
      // update SeoAudit
      updateSeoAudit = await seoAuditFind.update({
        grading,
        assign,
        reassign,
        date,
        status,
        timeEstimation,
        time,
        topKey,
        note,
        amount,
        startDate,
        dueDate,
      });
    }
    return {
      data: updateSeoAudit,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get all SeoAudit by project id api controller**********
exports.getAllSeoAudit = async (req) => {
  const { projectId } = req.body;
  try {
    // find all SeoAudit
    let allSeoAudit = await SeoAudit.findAll({ where: { projectId } });
    return {
      data: allSeoAudit,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********seoAudit update status api controller**********
exports.seoAuditUpdateStatus = async (req) => {
  try {
    let { checkQuestion, status } = req.body;

    // find seoAudit
    let seoAuditFind = await SeoAudit.findOne({
      where: { checkQuestion },
    });

    // if seoAudit doesn't exist
    if (seoAuditFind == null) {
      return {
        data: null,
        error: "seoAudit doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update seoAudit
    await seoAuditFind.update({
      status,
    });

    return {
      data: "Status updated",
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********seoAudit update time api controller**********
exports.seoAuditUpdateTime = async (req) => {
  try {
    let { checkQuestion, time } = req.body;

    // find seoAudit
    let seoAuditFind = await SeoAudit.findOne({
      where: { checkQuestion },
    });

    // if seoAudit doesn't exist
    if (seoAuditFind == null) {
      return {
        data: null,
        error: "seoAudit doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    // update seoAudit
    await seoAuditFind.update({
      time,
    });

    return {
      data: "time updated",
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get project task on the basis of projectId,seoAuditId  **********
exports.getSeoAuditTask = async (req) => {
  const { checkQuestion, projectId } = req.body;
  try {
    // find SeoAudit
    let allSeoAudit = await SeoAudit.findOne({
      where: { checkQuestion: checkQuestion, projectId },
    });

    const data = allSeoAudit;
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

// **********delete SeoAudit api by id controller**********
exports.deleteSeoAudit = async (req) => {
  try {
    let { seoAuditId } = req.body;
    let deleteSeoAudit = await SeoAudit.destroy({
      where: { id: seoAuditId },
    });

    // if SeoAudit doesn't exist
    if (deleteSeoAudit == 0) {
      return {
        data: null,
        error: "SeoAudit doesn't exist",
        message: "Failed",
        statusCode: 400,
      };
    }

    return {
      data: deleteSeoAudit,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********upload SeoAudit table api  controller**********

exports.uploadSeoAuditTable = async (req) => {
  try {
    const seoAudit = [
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "Is Google Analytics Installed?",
        tool: "gachecker.com",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "GA duplication check",
        tool: "GA Debug Extension",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "Is Search Console setup?",
        tool: "https://search.google.com/",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "Are there any Search Console errors?",
        tool: "https://search.google.com/",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "Google cache analysis",
        tool: "gachecker.com",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "Is there a sitemap.xml file?",
        tool: "www.xml-sitemaps.com",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion:
          "Is there a discrepancy between indexed pages in Google and Sitemap?",
        tool: "Check Sitemap in GSC and site:in Google",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "Are any invalid pages in the sitemap?",
        tool: "Screaming Frog",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "Are there any negative search results for the brand?",
        tool: "Google / Visual",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "Are there any negative Google Autosuggest?",
        tool: "Google / Visual",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "Is there a Google News sitemap.xml file?",
        tool: "https://search.google.com/",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "Any manual actions?",
        tool: "https://search.google.com/",
      },
      {
        tableCategory: "GOOGLE (13 checks)",
        tableSubCategory: "",
        checkQuestion: "Are there any crawl errors?",
        tool: "https://search.google.com/",
      },
      {
        tableCategory: "BENCHMARKS (6 checks)",
        tableSubCategory: "",
        checkQuestion: "Total Pages Indexed in Google",
        tool: "https://search.google.com/",
      },
      {
        tableCategory: "BENCHMARKS (6 checks)",
        tableSubCategory: "",
        checkQuestion: "Total Number of Backlinks",
        tool: "semrush.com",
      },
      {
        tableCategory: "BENCHMARKS (6 checks)",
        tableSubCategory: "",
        checkQuestion: "Total Number of Linking Root Domains",
        tool: "semrush.com",
      },
      {
        tableCategory: "BENCHMARKS (6 checks)",
        tableSubCategory: "",
        checkQuestion: "Total Number of Organic Keywords",
        tool: "semrush.com",
      },
      {
        tableCategory: "BENCHMARKS (6 checks)",
        tableSubCategory: "",
        checkQuestion: "20-50 Top Keyword Positions",
        tool: "semrush.com",
      },
      {
        tableCategory: "BENCHMARKS (6 checks)",
        tableSubCategory: "",
        checkQuestion: "Domain Age",
        tool: "webconfs.com/web-tools/domain-age-tool/",
      },
      {
        tableCategory: "COMPETITION ANALYSIS (5 checks)",
        tableSubCategory: "",
        checkQuestion: "Top 3-5 competitors identified?",
        tool: "Client / SEMRush / Ahrefs",
      },
      {
        tableCategory: "COMPETITION ANALYSIS (5 checks)",
        tableSubCategory: "",
        checkQuestion: "Has the competition been benchmarked?",
        tool: "Visual / Export",
      },
      {
        tableCategory: "COMPETITION ANALYSIS (5 checks)",
        tableSubCategory: "",
        checkQuestion: "Competitor top 10 keywords",
        tool: "Visual / Export",
      },
      {
        tableCategory: "COMPETITION ANALYSIS (5 checks)",
        tableSubCategory: "",
        checkQuestion: "Competitor average search positions",
        tool: "Visual / Export",
      },
      {
        tableCategory: "COMPETITION ANALYSIS (5 checks)",
        tableSubCategory: "",
        checkQuestion: "Top ranking keywords",
        tool: "Visual / Export",
      },
      {
        tableCategory: "COMPETITION ANALYSIS (5 checks)",
        tableSubCategory: "",
        checkQuestion: "Competitor Content Analysis",
        tool: "Ahrefs Content Explorer",
      },
      {
        tableCategory: "COMPETITION ANALYSIS (5 checks)",
        tableSubCategory: "",
        checkQuestion: "competiro traffic for keywords",
        tool: "",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Site protocol checks",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Site protocol checks",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Pagination checks",
        tool: "Screaming Frog",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Canonical checks",
        tool: "Screaming Frog",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Print version Noindexed?",
        tool: "Visual",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Has Internal Linking been classified on primary pages?",
        tool: "Screaming Frog / SEMRush",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Site Visualisation Checks",
        tool: "Screaming Frog / Sitebulb",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Internal redirects",
        tool: "Screaming Frog",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Redirect chains & Redirect loops",
        tool: "Screaming Frog",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Robots.txt present?",
        tool: "Visual",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Robots.txt review",
        tool: "Visual / SC",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Are pages being correctly blocked by Robots.txt?",
        tool: "Visual",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Are pages being correctly blocked by Meta Robots?",
        tool: "Screaming Frog",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Category Use (ecomm)",
        tool: "Visual",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "URL naming convention - is this well optimised?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Site protocol checks",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Error Pages",
        tool: "Screaming Frog",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Is an HTML Sitemap in use?",
        tool: "Visual / Screaming Frog",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Are Tag Pages being used?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Is the site using a crumb trail?",
        tool: "Visual",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Is primary navigation easy to use?",
        tool: "Visual / UX",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Footer navigation checks?",
        tool: "Visual",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Is all good content under 4 clicks from home?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "SITE ARCHITECTURE (23 checks)",
        tableSubCategory: "",
        checkQuestion: "Menu setup and use",
        tool: "Visual",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Primary Protocol Use (HTTP / HTTPS)?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Does the site have a valid SSL certificate?",
        tool: "Chrome / sslchecker.com",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Do all pages redirect from HTTP to HTTPS correctly?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Is an HSTS policy in place?",
        tool: "securityheaders.com",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Does the site use Subdomains?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Does the site carry a Favicon?",
        tool: "Visual",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Site Uptime",
        tool: "uptimerobot.com",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Broken / Redirected Internal Links",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Broken / Redirected External Links",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Javascript Use",
        tool: "Screaming Frog / Visual",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Is the .htaccess file configured correctly?",
        tool: "Visual",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Are Dynamic Pages being served correctly?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion:
          "Does the site have open dynamic pages that can be blocked?",
        tool: "From Crawl Data",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Malware & Security Checks",
        tool: "sitecheck.sucuri.net",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Blacklist check",
        tool: "mxtoolbox.com & ultratools.com/tools/spamDBLookup",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Site Speed Checks",
        tool: "webpagetest.org / GTMetrix",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion:
          "Are any pages being duplicated due to poor architecture?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Structured Data & Schema Use",
        tool: "Google Testing Tool / SC",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Are there any Chrome Console Errors?",
        tool: "Chrome Inspect",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Is CSS being minified?",
        tool: "seositecheckup.com/tools/css-minification-test",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Is Inline CSS being used?",
        tool: "Visual",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Is every site page secure and without errors?",
        tool: "Screaming Frog",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Are there any canonical errors?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Are all ads and affiliate links nofollowed?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion:
          "Can the site be crawled and used without Javascript on?",
        tool: "Chrome Web Developer Exension",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Server location by IP",
        tool: "iplocation.net",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Check all sites on webserver",
        tool: "viewdns.info/reverseip/",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Do any pages have more than 100 external links?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "What platform is the site built on?",
        tool: "builtwith.com",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Does the platform come with known restrictions?",
        tool: "Research",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Is a CDN in use?",
        tool: "builtwith.com",
      },
      {
        tableCategory: "TECHNICAL SEO CHECKS (32 checks)",
        tableSubCategory: "",
        checkQuestion: "Check domain history",
        tool: "SEMRush / Wayback Machine",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "",
        checkQuestion: "Are any Deprecated HTML Tags being used?",
        tool: "seositecheckup.com/tools/deprecated-html-tags-test",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "",
        checkQuestion: "HTML Validation",
        tool: "validator.w3.org",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "",
        checkQuestion: "Accessibility Checks",
        tool: "https://www.webaccessibility.com/",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "",
        checkQuestion: "CSS Checks",
        tool: "From Data",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "PAGE TITLES",
        checkQuestion:
          "-- Are all page titles under 65 characters? (570 pixels)",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "PAGE TITLES",
        checkQuestion: "-- Are any Page Titles under 30 characters?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "PAGE TITLES",
        checkQuestion:
          "-- Are any page titles being duplicated without canonical/pagination?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "PAGE TITLES",
        checkQuestion: "-- Any signs of keyword cannibalisation?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "PAGE TITLES",
        checkQuestion: "-- Is the primary keyword/phrase close to the start?",
        tool: "Most Crawling Tools / Visual",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "PAGE TITLES",
        checkQuestion: "-- Are page titles descriptive of the page content?",
        tool: "Most Crawling Tools / Visual",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "PAGE TITLES",
        checkQuestion: "-- Are any page titles missing?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "-- Are all Meta Descriptions unique and descriptive?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "-- Are any Meta Descriptions missing?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion:
          "-- Are any Meta Descriptions being duplicated without canonical/pagination?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "-- Are any Meta Descriptions below 70 characters?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Are Meta Keywords in use?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Are there any redirects other than 301?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Are there any 5xx errors?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Are images ALT tags in use?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Are there too many ads on any pages?",
        tool: "Visual",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Does the site bombard you with popups?",
        tool: "Visual",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Does the site carry clear Call to Actions?",
        tool: "Visual",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Does each page have a clear H1 tag?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Are H2's being used across the site?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Is the site W3C Compliant?",
        tool: "validator.w3.org",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Does site:brand show expected sitelinks?",
        tool: "Google / Visual",
      },
      {
        tableCategory: "MOBILE AUDIT CHECKS (15 checks)",
        tableSubCategory: "META DESCRIPTIONS",
        checkQuestion: "Is the site using a Cookie Acceptance notice?",
        tool: "Visual",
      },
      {
        tableCategory: "KEYWORD ANALYSIS (10 checks)",
        tableSubCategory: "",
        checkQuestion: "Site keyword research for Benchmarks",
        tool: "Most Keyword Tools",
      },
      {
        tableCategory: "KEYWORD ANALYSIS (10 checks)",
        tableSubCategory: "",
        checkQuestion: "Brand search - Does homepage come up #1 when searched?",
        tool: "Google /Visual",
      },
      {
        tableCategory: "KEYWORD ANALYSIS (10 checks)",
        tableSubCategory: "",
        checkQuestion: "Primary homepage term",
        tool: "Site",
      },
      {
        tableCategory: "KEYWORD ANALYSIS (10 checks)",
        tableSubCategory: "",
        checkQuestion: "Is a keyword strategy in place?",
        tool: "Client / Research",
      },
      {
        tableCategory: "KEYWORD ANALYSIS (10 checks)",
        tableSubCategory: "",
        checkQuestion: "Is there evidence of keyword duplication or overuse?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "KEYWORD ANALYSIS (10 checks)",
        tableSubCategory: "",
        checkQuestion: "Are keywords in H1?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "KEYWORD ANALYSIS (10 checks)",
        tableSubCategory: "",
        checkQuestion: "Are keywords in H2?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "KEYWORD ANALYSIS (10 checks)",
        tableSubCategory: "",
        checkQuestion: "Are keywords in Meta Description?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "KEYWORD ANALYSIS (10 checks)",
        tableSubCategory: "",
        checkQuestion: "Are keywords in the main page document?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Are all fonts large enough to read clearly?",
        tool: "Visual",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Are hyperlinks clear?",
        tool: "Visual",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Could font colour be considered too light?",
        tool: "Visual",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion:
          "Are there clear primary and supplementary content types?",
        tool: "Visual",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Is content Evergreen or Fresh?",
        tool: "Visual",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Are there any thin pages? <200 words of content?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Does the site carry an up to date Privacy Policy?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Does the site carry up to date TOS's?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Is there any duplicate content internally?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Is there any duplicate content externally?",
        tool: "Siteliner",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Is any content scraped from external sources?",
        tool: "Siteliner",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Is the contact page easy to find and use?",
        tool: "Visual",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Content Gap Analysis",
        tool: "Ahrefs",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Copy and classification checks",
        tool: "uclassify.com/browse",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Has page grammar been checked?",
        tool: "Grammarly",
      },
      {
        tableCategory: "CONTENT AUDIT (16 checks)",
        tableSubCategory: "",
        checkQuestion: "Has page spelling been checked?",
        tool: "Checkdog / Grammarly",
      },
      {
        tableCategory: "USER EXPERIENCE (UX) (8 Checks)",
        tableSubCategory: "",
        checkQuestion: "Site video use",
        tool: "Visual",
      },
      {
        tableCategory: "USER EXPERIENCE (UX) (8 Checks)",
        tableSubCategory: "",
        checkQuestion: "Homepage check",
        tool: "Visual",
      },
      {
        tableCategory: "USER EXPERIENCE (UX) (8 Checks)",
        tableSubCategory: "",
        checkQuestion: "Internal page checks",
        tool: "Visual",
      },
      {
        tableCategory: "USER EXPERIENCE (UX) (8 Checks)",
        tableSubCategory: "",
        checkQuestion: "Contact page check",
        tool: "Visual",
      },
      {
        tableCategory: "USER EXPERIENCE (UX) (8 Checks)",
        tableSubCategory: "",
        checkQuestion: "404 page check",
        tool: "Visual",
      },
      {
        tableCategory: "USER EXPERIENCE (UX) (8 Checks)",
        tableSubCategory: "",
        checkQuestion: "Category Pages (ecomm)",
        tool: "Visual",
      },
      {
        tableCategory: "USER EXPERIENCE (UX) (8 Checks)",
        tableSubCategory: "",
        checkQuestion: "Mobile UX Priorities",
        tool: "Visual",
      },
      {
        tableCategory: "USER EXPERIENCE (UX) (8 Checks)",
        tableSubCategory: "",
        checkQuestion: "Review live site usage",
        tool: "Hotjar / Yandex Metrica",
      },
      {
        tableCategory: "BACKLINKS & ANALYSIS (8 checks)",
        tableSubCategory: "",
        checkQuestion: "Backlink health & Score",
        tool: "Ahrefs",
      },
      {
        tableCategory: "BACKLINKS & ANALYSIS (8 checks)",
        tableSubCategory: "",
        checkQuestion: "Spammy domains",
        tool: "Ahrefs",
      },
      {
        tableCategory: "BACKLINKS & ANALYSIS (8 checks)",
        tableSubCategory: "",
        checkQuestion: "Has disavow file been created?",
        tool: "GSC",
      },
      {
        tableCategory: "BACKLINKS & ANALYSIS (8 checks)",
        tableSubCategory: "",
        checkQuestion: "Has disavow file been checked?",
        tool: "Visual / Ahrefs",
      },
      {
        tableCategory: "BACKLINKS & ANALYSIS (8 checks)",
        tableSubCategory: "",
        checkQuestion: "Anchor Text Use",
        tool: "Ahrefs",
      },
      {
        tableCategory: "BACKLINKS & ANALYSIS (8 checks)",
        tableSubCategory: "",
        checkQuestion: "Backlinks lost",
        tool: "Ahrefs",
      },
      {
        tableCategory: "BACKLINKS & ANALYSIS (8 checks)",
        tableSubCategory: "",
        checkQuestion: "Broken Backlinks",
        tool: "Ahrefs",
      },
      {
        tableCategory: "BACKLINKS & ANALYSIS (8 checks)",
        tableSubCategory: "",
        checkQuestion:
          "Are there large number of backlinks from 1 domain or more?",
        tool: "Ahrefs",
      },
      {
        tableCategory: "INTERNATIONALISATION (9 checks)",
        tableSubCategory: "",
        checkQuestion: "",
        tool: "",
      },
      {
        tableCategory: "INTERNATIONALISATION (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Does the site have an international audience?",
        tool: "Client / Research",
      },
      {
        tableCategory: "INTERNATIONALISATION (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Is the site using rel='alternate' hreflang='x' ?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "INTERNATIONALISATION (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Is the site being translated without errors?",
        tool: "Visual",
      },
      {
        tableCategory: "INTERNATIONALISATION (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Is the site using an international URL structure?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "INTERNATIONALISATION (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Are the correct localised web pages being used?",
        tool: "flang.dejanseo.com.au / Research / Client",
      },
      {
        tableCategory: "INTERNATIONALISATION (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Does the site have backlinks from target countries?",
        tool: "Ahrefs",
      },
      {
        tableCategory: "INTERNATIONALISATION (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Is the site Multilingual, Multiregional or both?",
        tool: "Client / Research",
      },
      {
        tableCategory: "INTERNATIONALISATION (9 checks)",
        tableSubCategory: "",
        checkQuestion:
          "Does the site location need to be setup in Search Console?",
        tool: "GSC",
      },
      {
        tableCategory: "INTERNATIONALISATION (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Checks from international locations",
        tool: "Browseo & International IP's",
      },
      {
        tableCategory: "LOCAL SEO AUDIT (9 checks)",
        tableSubCategory: "",
        checkQuestion:
          "Does the site need and gain traffic from local audiences?",
        tool: "Client / Research",
      },
      {
        tableCategory: "LOCAL SEO AUDIT (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Are local titles tags being used?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "LOCAL SEO AUDIT (9 checks)",
        tableSubCategory: "",
        checkQuestion:
          "Is there a consistent NAP across the site and external sites",
        tool: "Visual / Ahrefs",
      },
      {
        tableCategory: "LOCAL SEO AUDIT (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Is local structured data being used?",
        tool: "Visual",
      },
      {
        tableCategory: "LOCAL SEO AUDIT (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Is there a Google MyBusiness listing?",
        tool: "Google My Business",
      },
      {
        tableCategory: "LOCAL SEO AUDIT (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Is the site listed in reputable business directories?",
        tool: "Research / Ahrefs",
      },
      {
        tableCategory: "LOCAL SEO AUDIT (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Does the site have local citations?",
        tool: "Research / Ahrefs",
      },
      {
        tableCategory: "LOCAL SEO AUDIT (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Does the site carry good local content?",
        tool: "Visual",
      },
      {
        tableCategory: "LOCAL SEO AUDIT (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Does the site have too many thin content local pages?",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "NEGATIVE PRACTICE CHECK (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Hidden text",
        tool: "Crawling Tools & Research",
      },
      {
        tableCategory: "NEGATIVE PRACTICE CHECK (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Cloaking",
        tool: "duplichecker.com/cloaking-checker.php",
      },
      {
        tableCategory: "NEGATIVE PRACTICE CHECK (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Doorway pages",
        tool: "Most Crawling Tools",
      },
      {
        tableCategory: "NEGATIVE PRACTICE CHECK (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Meta Refresh",
        tool: "Screaming Frog",
      },
      {
        tableCategory: "NEGATIVE PRACTICE CHECK (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Javascript redirection",
        tool: "Screaming Frog",
      },
      {
        tableCategory: "NEGATIVE PRACTICE CHECK (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Link Exchanges",
        tool: "Ahrefs / Research",
      },
      {
        tableCategory: "NEGATIVE PRACTICE CHECK (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Is Flash being used?",
        tool: "Screaming Frog",
      },
      {
        tableCategory: "NEGATIVE PRACTICE CHECK (9 checks)",
        tableSubCategory: "",
        checkQuestion: "Are iFrames in use?",
        tool: "Screaming Frog",
      },
    ];
    for (ele of seoAudit) {
      const create = await SeoAuditTable.create({
        tableCategory: ele.tableCategory,
        tableSubCategory: ele.tableSubCategory,
        checkQuestion: ele.checkQuestion,
        tool: ele.tool,
      });
    }

    return {
      data: "successfully entered all table",
      error: null,
      message: "Success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// **********get SeoAudit table api  controller**********

exports.getSeoAuditTable = async (req) => {
  const { projectId } = req.body;
  try {
    const getTable = await SeoAuditTable.findAll();
    const getData = await SeoAudit.findAll({ where: { projectId } });
    const tableLength = getTable.length;
    // let arr3 = getTable.map((item, i) => Object.assign({}, item, getData[i]));
    // console.log(arr3);
    // return;
    // const allData = [];
    // for (let index = 0; index < tableLength; index++) {
    //   const element = getTable[index];
    //   const allTableElement = [element];
    //   for (const ele of allTableElement) {
    //     const getData = await SeoAudit.findAll({
    //       where: { projectId },
    //     });

    //     for (const data of getData) {
    //       allData.push({
    //         checkQuestion: ele.id,
    //         grading: data.status,
    //         assign: data.assign,
    //       });
    //     }
    // console.log(getData);
    // allData.push({
    //   checkQuestion: ele.id,
    // grading: getData.grading,
    // assign: getData.assign,
    // reassign: getData.reassign,
    // date: getData.date,
    // status: getData.status,
    // timeEstimation: getData.timeEstimation,
    // time: getData.time,
    // projectId: getData.projectId,
    // taskType: getData.taskType,
    // amount: getData.amount,
    // topKey: getData.topKey,
    // note: getData.note,
    // startDate: getData.startDate,
    // dueDate: getData.dueDate,
    // createdAt: getData.createdAt,
    // updatedAt: getData.updatedAt,
    // });
    //   }
    // }
    // for (ele of getData) {
    //   for (element of getTable) {
    //     allData.push({
    //       status: ele.status,
    //     });
    //   }
    // }
    // console.log(allData);
    // const merge = [];
    // for (let i = 0; i < getTable.length; i++) {
    //   merged.push({
    //     ...getTable[i],
    //     // ...getData[i],
    //   });
    // }
    return {
      data: getData,
      error: null,
      message: "Success",
      statusCode: 200,
    };
  } catch (error) {
    res.status(500).send(error.message);
  }
};
