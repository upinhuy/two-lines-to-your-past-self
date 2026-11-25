import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const line1 =
  "Don't hang up on your mother that rainy Tuesday in October 2018 when she calls to say Dad is in the hospital.";
const line2 =
  "You never got to say goodbye to him, and that silence taught you to answer every call like it might be the last one.";

const entry = `${line1}\n${line2}\n`;

// Gate check, mirroring the bounty contract: UTF-8 text, 1-280 chars, exactly two lines.
const body = entry.replace(/\n$/, "");
if (body.length < 1 || body.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${body.length}`);
}
if (body.split("\n").length !== 2) {
  throw new Error(`entry must be exactly two lines, got ${body.split("\n").length}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
console.log(`Wrote ${entry.length} characters to ${join(outDir, "entry.txt")}`);
