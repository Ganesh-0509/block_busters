/*
 This circuit proves that:
 userConfirmedOutput == modelOutput

 If user edits the output incorrectly,
 the proof will FAIL.
*/

template PredictionCheck() {
    // Public inputs
    signal input modelOutput;
    signal input userOutput;

    // Public output
    signal output isValid;

    // Constraint: modelOutput must equal userOutput
    // If they're not equal, the constraint fails
    modelOutput === userOutput;
    
    // Output is always 1 if we reach here (constraint passed)
    isValid <== 1;
}

// Main entry point
component main = PredictionCheck();
