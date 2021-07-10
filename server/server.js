const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const usersRouter = require("./routes/users");
const runsRouter = require("./routes/runs");
const exportRouter = require("./routes/exports");

app.use("/user", usersRouter);
app.use("/runs", runsRouter);
app.use("/exports", exportRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
