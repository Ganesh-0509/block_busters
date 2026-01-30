const fs = require("fs");
const path = require("path");

async function main() {
  const wasmPath = process.argv[2];
  const inputPath = process.argv[3];
  const outputPath = process.argv[4];

  // Resolve relative to current working directory
  const resolvedWasmPath = path.resolve(wasmPath);
  const resolvedInputPath = path.resolve(inputPath);
  const resolvedOutputPath = path.resolve(outputPath);

  const wasm = require(resolvedWasmPath);
  const input = JSON.parse(fs.readFileSync(resolvedInputPath, "utf8"));

  const witness = await wasm.calculateWitness(input, 0);
  fs.writeFileSync(resolvedOutputPath, Buffer.from(witness.buffer));
  console.log("Witness generated:", resolvedOutputPath);
}

main().catch(console.error);
