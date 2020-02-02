const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerTypeSchema = new Schema({
  type: String
});

mongoose.model("customer_types", customerTypeSchema);
