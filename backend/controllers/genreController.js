import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingGenre = await Genre.findOne({ name });

    if (existingGenre) {
      return res.json({ error: "Already exists" });
    }

    const genre = await new Genre({ name }).save();
    res.json(genre);
  } catch (error) {
    return res.status(400).json(error);
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const genre = await Genre.findOne({ _id: id });

  if (!genre) {
    return res.status(404).json({ error: "Genre not found" });
  }

  genre.name = name;

  const upadatedGenre = await genre.save();
  res.json(upadatedGenre);
});

const deleteGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Genre.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).json({ error: "Not Found" });
    }

    res.json({ removed });
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
});

const listGenres = asyncHandler(async (req, res) => {
  try {
    const all = await Genre.find({});
    res.json(all);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

const readGenre = asyncHandler(async (req, res) => {
  try {
    const genre = await Genre.findById({ _id: req.params.id });
    res.json(genre);
  } catch (error) {}
});
export { createGenre, updateGenre, deleteGenre, listGenres, readGenre };
