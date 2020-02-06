const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  position: String,
  firstName: String,
  lastName: String,
  userId: String,
  email: { type: String, lowercase: true },
  officeNumber: { type: String, trim: true },
  mobile: { type: String, trim: true },
  extension: { type: String },
  active: { type: Boolean, default: true }
});

mongoose.model('contacts', contactSchema);
