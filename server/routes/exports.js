"use strict";
const router = require("express").Router();

const fs = require("fs");
const moment = require("moment");
const mdq = require("mongo-date-query");
const json2csv = require("json2csv").parse;
const path = require("path");
const fields = ["name", "date", "distance", "duration", "pace"];
const Run = require("../models/run_model");

router.get("/", function (req, res) {
  Run.find(function (err, students) {
    if (err) {
      return res.status(500).json({ err });
    } else {
      let csv;
      try {
        csv = json2csv(students, { fields });
      } catch (err) {
        return res.status(500).json({ err });
      }
      const dateTime = moment().format("test");
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "exports",
        "csv-" + dateTime + ".csv"
      );
      fs.writeFile(filePath, csv, function (err) {
        if (err) {
          return res.json(err).status(500);
        } else {
          setTimeout(function () {
            fs.unlinkSync(filePath); // delete this file after 30 seconds
          }, 30000);
          return res.json("csv-" + dateTime + ".csv");
        }
      });
    }
  });
});

module.exports = router;
