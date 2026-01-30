import express from "express";
import { getPrediction } from "../services/mlClient.js"; // calls deployed API

const router = express.Router();

router.post("/", async (req, res) => {
  const inputFeatures = req.body;
  try {
    const prediction = await getPrediction(inputFeatures);
    res.json({
      input_features: inputFeatures,
      predicted_price: prediction.predicted_house_price,
      message: prediction.message || "Price prediction successful"
    });
  } catch (err) {
    res.status(500).json({
      error: "Prediction failed",
      details: err?.message || "Unknown error"
    });
  }
});

export default router;
