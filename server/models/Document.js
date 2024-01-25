const { Schema, model } = require("mongoose")

const Document = new Schema({
  _id: String,
  data: Object,
  userId: String,
  title: String,
  docAccess: { type: String, enum:['public', 'private', 'group'], default: 'private'},
  shared: [{ userId: String, role: String}]
})

module.exports = model("Document", Document)
