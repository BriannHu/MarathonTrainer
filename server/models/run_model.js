const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const runSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    date: {
      type: Date,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    pace: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Run = mongoose.model("Run", runSchema);

module.exports = Run;
