// Entry for "The Best Advice I Ever Got" (make.fun).
// Writes one sentence of advice to the output file the kit's RULES
// require: /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The grading sandbox mounts the repository read-only, so the output
// directory must come from the environment, never from the repo itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "My father told me to never lend money I was not ready to lose, and the first time I ignored him, I lost both the money and the friend.";

// The gate refuses anything outside 1-200 characters, and anything that is
// only whitespace or spans more than one line: fail loudly here instead of
// shipping an invalid entry. The sentence stays exactly one sentence: a
// father's warning, then the price of ignoring it once.
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry is ${line.length} characters, outside the 1-200 limit`);
}
if (line.trim().length === 0 || line.includes("\n")) {
  throw new Error("entry must be a single non-empty line");
}
// The competition asks for one sentence: exactly one terminal period,
// at the very end, and no other sentence-ending punctuation inside.
const terminalStops = (line.match(/[.!?]/g) || []).length;
if (terminalStops !== 1 || !line.endsWith(".")) {
  throw new Error("entry must be exactly one sentence ending with a period");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, line, "utf8");
console.log(`wrote ${line.length} characters to ${outFile}`);
