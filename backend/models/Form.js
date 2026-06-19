const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  label: {
    type: String,
  },
  type: {
    type: String,
  },
  required: {
    type: Boolean,
  },
});

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    fields: [fieldSchema],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Form", formSchema);