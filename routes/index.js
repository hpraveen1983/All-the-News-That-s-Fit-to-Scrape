/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
Routes for the main html page
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
"use strict";

const express = require("express");
const router = express.Router();
const db = require("../models");
const scraper = require("./api/scrape");

//
// GET /test
//
router.get("/test", (req, res) => {
  res.json({ test: "/test"});
});

//
// A GET route for all articles
//
router.get("/", (req, res) => {
  db.Article.find({}).sort({ createdAt: -1 })
    .then(result => {
      console.log(`Article count: ${result.length}`);
      res.render("index", { article: result });
    })
    .catch(err => {
      res.render("index", { article: "failed to get articles"});
    });
});

//
// A GET route for all commented articles
//
router.get("/commented", (req, res) => {
  db.Article.find({
    comments: { 
      $exists: true, 
      $ne: [] 
    }
  }).sort({ createdAt: -1 })
    .then(result => {
      console.log(`Article count(commented): ${result.length}`);
      res.render("index", { article: result });
    })
    .catch(err => {
      res.render("index", { article: "failed to get articles"});
    });
});

//
// A GET route for scraping articles
//
router.get("/scrape", (req, res) => {
  const articles = scraper();
  
  // if (articles.lenth === 0) {
  //   res.render("index", { article: "failed to retrieve articles"});
  // } else {
  //   res.render("index", { article: articles });
  // }
  res.redirect("/");
});

module.exports = router;