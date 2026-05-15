require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const mealRoutes = require("./src/routes/meals");
const favoriteRoutes = require("./src/routes/favorites");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.dbReady = mongoose.connection.readyState === 1;
  next();
});

app.use("/", mealRoutes);
app.use("/favorites", favoriteRoutes);

app.use((req, res) => {
  res.status(404).render("error", {
    title: "Page Not Found",
    message: "The page you requested does not exist."
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", {
    title: "Something Went Wrong",
    message: "Please try again. If the problem continues, check the server logs."
  });
});

async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is not set. The app will run, but favorites cannot be saved.");
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
}

connectToDatabase()
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  })
  .finally(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Recipe Finder running at http://localhost:${port}`);
    });
  });
