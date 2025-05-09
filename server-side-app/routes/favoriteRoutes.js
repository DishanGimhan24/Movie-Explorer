import express from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoriteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get", authMiddleware, getFavorites);
router.post("/post", authMiddleware, addFavorite);
router.delete("/:movieId", authMiddleware, removeFavorite);

export default router;
