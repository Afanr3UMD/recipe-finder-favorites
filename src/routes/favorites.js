const express = require("express");
const mongoose = require("mongoose");

const Favorite = require("../models/Favorite");

const router = express.Router();

function ensureDatabase(req, res) {
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  res.status(503).render("error", {
    title: "Database Not Connected",
    message: "MongoDB is not connected. Add MONGODB_URI to your environment and restart the app."
  });

  return false;
}

router.get("/", async (req, res, next) => {
  if (!ensureDatabase(req, res)) {
    return;
  }

  try {
    const favorites = await Favorite.find().sort({ createdAt: -1 }).lean();

    res.render("favorites", {
      title: "Saved Favorites",
      favorites
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  if (!ensureDatabase(req, res)) {
    return;
  }

  const favorite = {
    mealId: req.body.mealId,
    name: req.body.name,
    category: req.body.category,
    area: req.body.area,
    thumbnail: req.body.thumbnail,
    sourceUrl: req.body.sourceUrl,
    notes: req.body.notes
  };

  try {
    await Favorite.findOneAndUpdate(
      { mealId: favorite.mealId },
      favorite,
      { upsert: true, runValidators: true, new: true }
    );

    res.redirect("/favorites");
  } catch (error) {
    next(error);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  if (!ensureDatabase(req, res)) {
    return;
  }

  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.redirect("/favorites");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
