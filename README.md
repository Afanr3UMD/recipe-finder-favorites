# Recipe Finder & Favorites

## Submitted by

Afan Rashid (Afanr3)

## Group Members

None

## App Description

Recipe Finder & Favorites lets users search for meals using TheMealDB API, view ingredients and instructions, and save favorite recipes with personal notes in MongoDB.

## YouTube Video Demo Link

https://youtu.be/kEqcbglxKTM

## APIs Information

TheMealDB API: https://www.themealdb.com/api.php

## Contact Email

afanr3@terpmail.umd.edu

## Deployed App Link

https://recipe-finder-favorites.onrender.com

## AI Use

ChatGPT/Codex was used to help develop the application.

## Running the App Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the main project directory:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

3. Start the app:

   ```bash
   npm start
   ```

4. Open the app:

   ```text
   http://localhost:3000
   ```

## Deployment Notes

Recommended Render settings:

- Build command: `npm install`
- Start command: `npm start`
- Environment variable: `MONGODB_URI`

The deployed app must use a real MongoDB Atlas connection string. Do not commit the `.env` file.

## Project Requirements Covered

- Node.js and Express application
- Uses `express.Router()` in `src/routes/meals.js` and `src/routes/favorites.js`
- Uses Mongoose to connect to MongoDB
- Stores and retrieves favorite recipes from MongoDB
- Includes forms for searching recipes and saving notes
- Uses a CSS file with `background-color`, `color`, `font-size`, and a Google Font
- Uses TheMealDB API to download external recipe data
- Prepared for deployment on Render or another Node hosting service
