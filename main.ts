// u-motasimfuad-notes-from-a-passive-aggressive-fridge-83c00ad7
// Writes one original passive-aggressive fridge note to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// No dependencies, no network, fully deterministic: the same
// line, byte for byte, on every run.
//
// The line, and why it is the one: the fridge picks one small,
// concrete domestic grudge — celery abandoned in the crisper
// drawer — and brags, smugly, about the one thing it controls:
// perfect humidity, kept for nine days. The turn lands in the
// last clause: the celery itself has started asking whether
// the owner still lives here. One scene, plain words, no moral,
// and the punchline is the very last thing the reader meets.
// The line is original, written for this entry, and copies no
// known joke or past winner.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Revision 1 (wording): "for nine days" reads a touch wordy;
// "nine days" on its own is tighter and keeps the same meaning,
// and the setup and the closing punchline are untouched.
const LINE =
  "Your celery has sat in my crisper drawer nine days at perfect humidity — it just asked if you still live here.";

// Revision 2 (structure): the length guard now lives in its own
// small function, so the entrypoint reads top to bottom — the
// line, the check, the write — instead of mixing the guard in
// with the path setup. Behaviour is unchanged: same line, same
// output path, same error on a wrong length.
function checkLine(line: string): number {
  const chars = [...line].length;
  if (chars < 1 || chars > 200 || line.includes("\n")) {
    throw new Error(`expected 1-200 characters on one line, got ${chars}`);
  }
  return chars;
}

function writeEntry(line: string): void {
  checkLine(line);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputPath = join(outputDir, "entry.txt");

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, line, "utf8");
}

writeEntry(LINE);
