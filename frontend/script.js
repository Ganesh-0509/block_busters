const form = document.getElementById("predict-form");
const resultDiv = document.getElementById("prediction-result");
const predictedInput = document.getElementById("predicted-value");
const inputSummary = document.getElementById("input-summary");
const verifyBtn = document.getElementById("verify-btn");

let currentPrediction = null; // store prediction until verification

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const inputObj = {};
  for (let [key, value] of formData.entries()) {
    inputObj[key] = parseFloat(value);
  }

  try {
    // Call backend
    const res = await fetch("http://localhost:5000/api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputObj),
    });
    const data = await res.json();
    currentPrediction = data.predicted_price;
    predictedInput.value = currentPrediction;

    // Render input summary
    inputSummary.innerHTML = "";
    Object.entries(inputObj).forEach(([key, value]) => {
      const li = document.createElement("li");
      li.textContent = `${key}: ${value}`;
      inputSummary.appendChild(li);
    });

    // Show prediction & verify button
    resultDiv.style.display = "block";
  } catch (err) {
    alert("Error fetching prediction");
    console.error(err);
  }
});

// Only after user clicks Verify
verifyBtn.addEventListener("click", () => {
  if (currentPrediction !== null) {
    alert(`Prediction verified: ${currentPrediction}`);
    // Here you can call prover/zk-circuit next step
    // e.g., send {inputObj, prediction} to backend/zk-prover
  }
});
