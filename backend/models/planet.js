const mongoose = require("mongoose");

const planetSchema = mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model("Planet", planetSchema);
