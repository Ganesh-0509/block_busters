import fetch from "node-fetch";

// Replace with your deployed ML API endpoint
const ML_API_URL = "https://california-housing-ml-1.onrender.com/predict";

export async function getPrediction(inputFeatures) {
  try {
    const params = new URLSearchParams();
    Object.entries(inputFeatures).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    const response = await fetch(`${ML_API_URL}?${params.toString()}`, {
      method: "POST"
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ML API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data;  // { predicted_price: ... }
  } catch (error) {
    console.error("Error fetching ML prediction:", error);
    throw error;
  }
}
