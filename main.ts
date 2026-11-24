// Seventeen Syllables of Debugging — make.fun entry.
// Writes one haiku about debugging (5-7-5) to /output/entry.txt.
//
// The haiku (69 characters, gate 1-200):
//   breakpoint at midnight          (5)
//   the log scrolls, silent, endless (7)
//   one semicolon                    (5)
// Concrete centre: a breakpoint, a scrolling log line at midnight.
// The turn: a whole night of hunting ends on one semicolon.

import { mkdirSync, readdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HAIKU: string =
  "breakpoint at midnight\n" +
  "the log scrolls, silent, endless\n" +
  "one semicolon";

function emptyDir(dir: string): void {
  // Empty ONLY the directory's contents. Never remove the directory itself:
  // the grader's /output is a mounted empty directory and removing it fails.
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir: string = process.argv[2] ?? "/output";
  emptyDir(outDir);
  const target: string = join(outDir, "entry.txt");
  writeFileSync(target, HAIKU, "utf8");
  // Gate: entry.txt must be UTF-8 text of 1-200 characters, not whitespace-only.
  // Re-read what was written and refuse to leave an out-of-gate file behind.
  const back: string = readFileSync(target, "utf8");
  if (back.length < 1 || back.length > 200 || back.trim().length === 0) {
    throw new Error(`entry.txt outside the 1-200 gate: ${back.length} characters`);
  }
  if (back !== HAIKU) {
    throw new Error("entry.txt does not match the haiku");
  }
}

main();
