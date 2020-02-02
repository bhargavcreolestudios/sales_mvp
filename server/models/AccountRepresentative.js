const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountRepresentativeSchema = new Schema({
  name: String,
  email: String,
  phone: { type: String, trim: true }
});

mongoose.model("account_representatives", accountRepresentativeSchema);
