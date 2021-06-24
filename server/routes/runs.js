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
  const hours = Number(req.body.hours);
  const minutes = Number(req.body.minutes);
  const seconds = Number(req.body.seconds);
  const paceMinutes = Number(req.body.paceMinutes);
  const paceSeconds = Number(req.body.paceSeconds);

  const newRun = new Run({
    name,
    date,
    distance,
    hours,
    minutes,
    seconds,
    paceMinutes,
    paceSeconds,
  });

  newRun.save(function (err, run) {
    return run
      .save()
      .then(() => res.json(run._id))
      .catch((err) => res.status(400).json("Error: " + err));
  });
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
      run.hours = Number(req.body.hours);
      run.minutes = Number(req.body.minutes);
      run.seconds = Number(req.body.seconds);
      run.paceMinutes = Number(req.body.paceMinutes);
      run.paceSeconds = Number(req.body.paceSeconds);
      run
        .save()
        .then(() => res.json("Run updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
