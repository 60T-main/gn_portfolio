import fs from "fs";
import { processGlb } from "gltf-pipeline";

async function compress() {
  const input = fs.readFileSync("public/models/input.glb");

  const results = await processGlb(input, {
    dracoOptions: {
      compressionLevel: 10, // highest compression
      quantizePositionBits: 14,
      quantizeNormalBits: 10,
      quantizeTexcoordBits: 12,
    },
  });

  fs.writeFileSync("public/models/output.glb", results.glb);
  console.log("✅ Compressed model saved to public/models/output.glb");
}

compress();