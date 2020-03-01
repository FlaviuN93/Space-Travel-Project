const mongoose = require("mongoose");

const planetSchema = mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Planet", planetSchema);
