import express from "express";
// import userAuth from "../middleware/userAuth.js";
import { getFavorites, addFavorite, removeFavorite, checkFavorite } from "../controllers/favoritesController.js";

const favoritesRouter = express.Router();

// Get a user's favorite tutors
favoritesRouter.get("/GetFavorites", getFavorites);

// Add a tutor to favorites
favoritesRouter.post("/AddFavorites", addFavorite);

// Remove a tutor from favorites by tutorId
favoritesRouter.delete("/RemoveFavorites/:tutorId", removeFavorite);

// Check if a tutor is already in favorites
favoritesRouter.get("/checkFavorite", checkFavorite);


export default favoritesRouter;
