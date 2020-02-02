const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema({
  location: String
});

mongoose.model("locations", locationSchema);
