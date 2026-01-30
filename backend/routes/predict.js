import express from "express";
import { getPrediction } from "../services/mlClient.js";

const router = express.Router();

// POST route for prediction
router.post("/", async (req, res) => {
  const inputFeatures = req.body;

  try {
    if (!inputFeatures || Object.keys(inputFeatures).length === 0) {
      return res.status(400).json({ error: "Missing input features" });
    }

    const prediction = await getPrediction(inputFeatures);
    res.json(prediction);
  } catch (error) {
    console.error("Prediction failed:", error);
    res.status(502).json({
      error: "Prediction failed",
      details: error?.message || "Unknown error"
    });
  }
});

export default router;
