const express = require("express");
const mongoose = require("mongoose");

const Favorite = require("../models/Favorite");

const router = express.Router();
const apiBase = "https://www.themealdb.com/api/json/v1/1";

function getIngredients(meal) {
  const ingredients = [];

  for (let index = 1; index <= 20; index += 1) {
    const ingredient = meal[`strIngredient${index}`];
    const measure = meal[`strMeasure${index}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() : ""} ${ingredient.trim()}`.trim());
    }
  }

  return ingredients;
}

async function searchMeals(query) {
  const response = await fetch(`${apiBase}/search.php?s=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("TheMealDB search request failed.");
  }

  const data = await response.json();
  return data.meals || [];
}

async function getMealById(mealId) {
  const response = await fetch(`${apiBase}/lookup.php?i=${encodeURIComponent(mealId)}`);

  if (!response.ok) {
    throw new Error("TheMealDB lookup request failed.");
  }

  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}

router.get("/", async (req, res, next) => {
  const query = (req.query.q || "").trim();

  try {
    const meals = query ? await searchMeals(query) : [];

    res.render("index", {
      title: "Recipe Finder",
      query,
      meals,
      searched: Boolean(query)
    });
  } catch (error) {
    next(error);
  }
});

router.get("/meals/:mealId", async (req, res, next) => {
  try {
    const meal = await getMealById(req.params.mealId);

    if (!meal) {
      return res.status(404).render("error", {
        title: "Recipe Not Found",
        message: "The recipe could not be found in TheMealDB."
      });
    }

    const savedFavorite = mongoose.connection.readyState === 1
      ? await Favorite.findOne({ mealId: meal.idMeal }).lean()
      : null;

    return res.render("meal-detail", {
      title: meal.strMeal,
      meal,
      ingredients: getIngredients(meal),
      savedFavorite
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
