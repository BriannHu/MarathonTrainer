const router = require("express").Router();
let Run = require("../models/run_model");

router.route("/").get((req, res) => {
  Run.find()
    .then((runs) => res.json(runs))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const date = Date.parse(req.body.date);
  const distance = Number(req.body.distance);
  const duration = Number(req.body.duration);
  const pace = Number(req.body.duration);
  const indoor = Boolean(req.body.indoor);

  const newRun = new Run({
    name,
    date,
    distance,
    duration,
    pace,
  });

  newRun
    .save()
    .then(() => res.json("Run added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Run.findById(req.params.id)
    .then((run) => res.json(run))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Run.findByIdAndDelete(req.params.id)
    .then(() => res.json("Run deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/edit/:id").post((req, res) => {
  Run.findById(req.params.id)
    .then((run) => {
      run.name = req.body.name;
      run.date = Date.parse(req.body.date);
      run.distance = Number(req.body.distance);
      run.duration = Number(req.body.duration);
      run.pace = Number(req.body.duration);
      run
        .save()
        .then(() => res.json("Run updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
