const { Schema, model, SchemaType } = require("mongoose");

const Document = new Schema(
  {
    _id: String,
    data: Object,
    userId: String,
    title: String,
    docAccess: {
      accessType: {
        type: String,
        enum: ["public", "private"],
        default: "private",
      },
      role: {
        type: String,
        enum: ["viewer", "editor", "commenter"],
        default: "viewer",
      },
    },
    shared: [
      {
        userId: String,
        role: {
          type: String,
          enum: ["viewer", "editor", "commenter"],
          default: "viewer",
        },
      },
    ],
  },
  { _id: false }
);

module.exports = model("Document", Document);
