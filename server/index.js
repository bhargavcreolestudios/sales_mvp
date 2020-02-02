const express = require("express");
const chalk = require("chalk");
const log = require("./config/helper");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// IMPORT MODELS
require("./models/Customer");
require("./models/Contact");
require("./models/Location");
require("./models/AccountRepresentative");
require("./models/CustomerType");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
/* Mongoose connect function */
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/sales_mvp`,
  { useUnifiedTopology: true, useNewUrlParser: true }
);

/* ROUTES */
require("./routes/customerRoutes")(app);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  log(chalk.green.bold(`App running on port ${PORT}`));
});
