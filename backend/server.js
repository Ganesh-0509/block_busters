import express from "express";
import cors from "cors";
import predictRoute from "./routes/predict.js";

const app = express();

// Enable CORS (allow frontend to call backend)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Routes
app.use("/api", predictRoute);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
