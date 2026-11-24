// One-star review of an everyday essential: sleep.
// Writes exactly one single-line review to /output/entry.txt.
// Node 22 stdlib only. Deterministic: same output on every run.

import { mkdirSync, writeFileSync } from "node:fs";

// DRAFT 2 (revised): the draft 1 ending, "Would not recommend", was flat
// and generic — every one-star review says it. The turn is sharper if sleep
// is treated as a subscription that charges eight hours a day and still
// under-delivers: "Would not renew the subscription" lands the sting in the
// last few words. "Wakes me up tired" is also more direct than "delivers me
// tired".
const REVIEW =
  "Sleep takes eight hours a day, every day, and still wakes me up tired. One star. Would not renew the subscription.";

function gate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 160) {
    throw new Error(`gate failed: review is ${chars} chars, must be 1-160`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: review is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate failed: review must be a single line");
  }
  if (text.includes("!")) {
    throw new Error("gate failed: no exclamation marks allowed");
  }
}

gate(REVIEW);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", REVIEW, "utf8");
console.log(`wrote ${[...REVIEW].length} chars to /output/entry.txt`);
