import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createGenre,
  updateGenre,
  deleteGenre,
  listGenres,
  readGenre,
} from "../controllers/genreController.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createGenre);
router.route("/:id").put(authenticate, authorizeAdmin, updateGenre);
router.route("/:id").delete(authenticate, authorizeAdmin, deleteGenre);
router.route("/genres").get(listGenres);
router.route("/:id").get(readGenre);

export default router;
