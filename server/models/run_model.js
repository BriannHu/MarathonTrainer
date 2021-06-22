const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const runSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    distance: {
      // stored as km
      type: Number,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
      min: 0,
    },
    minutes: {
      type: Number,
      required: true,
      min: 0,
      max: 59,
    },
    seconds: {
      type: Number,
      required: true,
      min: 0,
      max: 59,
    },
    paceMinutes: {
      type: Number,
      required: true,
      min: 0,
    },
    paceSeconds: {
      type: Number,
      required: true,
      min: 0,
      max: 59,
    },
  },
  { timestamps: true }
);

const Run = mongoose.model("Run", runSchema);

module.exports = Run;
