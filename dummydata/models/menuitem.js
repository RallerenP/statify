const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  top: Boolean,
  url: String,
  label: String,
  children: [mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model("menuitems", menuItemSchema)