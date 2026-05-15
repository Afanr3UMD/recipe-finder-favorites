const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    mealId: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: "Unknown",
      trim: true
    },
    area: {
      type: String,
      default: "Unknown",
      trim: true
    },
    thumbnail: {
      type: String,
      trim: true
    },
    sourceUrl: {
      type: String,
      trim: true
    },
    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
);

favoriteSchema.index({ mealId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
