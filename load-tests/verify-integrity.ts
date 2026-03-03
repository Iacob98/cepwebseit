/**
 * Post-load-test integrity checker.
 * Reads submission JSON files and verifies that all load test entries were persisted.
 *
 * Usage: npx tsx load-tests/verify-integrity.ts [--expected-contact N] [--expected-rechner N] [--expected-partner N]
 */

import fs from "fs/promises";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

interface Submission {
  id: string;
  email?: string;
  createdAt: string;
  [key: string]: unknown;
}

async function readJSON<T>(filename: string): Promise<T> {
  const raw = await fs.readFile(path.join(CONTENT_DIR, filename), "utf-8");
  return JSON.parse(raw) as T;
}

function parseArgs(): Record<string, number> {
  const args: Record<string, number> = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i].replace(/^--expected-/, "");
    const val = parseInt(argv[i + 1], 10);
    if (!isNaN(val)) args[key] = val;
  }
  return args;
}

async function verify() {
  const expected = parseArgs();
  let allPassed = true;

  const checks: { name: string; file: string; key: string }[] = [
    { name: "Contact", file: "contact-submissions.json", key: "contact" },
    { name: "Rechner", file: "rechner-submissions.json", key: "rechner" },
    { name: "Partner", file: "partner-submissions.json", key: "partner" },
  ];

  for (const { name, file, key } of checks) {
    try {
      const submissions = await readJSON<Submission[]>(file);
      const loadTestEntries = submissions.filter(
        (s) => s.email?.includes("loadtest") || s.email?.includes("test.example.com")
      );
      const totalCount = submissions.length;
      const ltCount = loadTestEntries.length;

      // Check for duplicate IDs
      const ids = submissions.map((s) => s.id);
      const uniqueIds = new Set(ids);
      const duplicates = ids.length - uniqueIds.size;

      console.log(`\n--- ${name} Submissions ---`);
      console.log(`  Total entries: ${totalCount}`);
      console.log(`  Load test entries: ${ltCount}`);
      console.log(`  Duplicate IDs: ${duplicates}`);

      if (duplicates > 0) {
        console.log(`  ❌ FAIL: Found ${duplicates} duplicate IDs`);
        allPassed = false;
      }

      if (expected[key] !== undefined) {
        if (ltCount >= expected[key]) {
          console.log(`  ✅ PASS: ${ltCount}/${expected[key]} expected load test entries present`);
        } else {
          console.log(`  ❌ FAIL: Only ${ltCount}/${expected[key]} expected load test entries found — DATA LOSS DETECTED`);
          allPassed = false;
        }
      }

      // Verify JSON integrity — each entry should have an id and createdAt
      const malformed = submissions.filter((s) => !s.id || !s.createdAt);
      if (malformed.length > 0) {
        console.log(`  ❌ FAIL: ${malformed.length} malformed entries (missing id or createdAt)`);
        allPassed = false;
      } else {
        console.log(`  ✅ PASS: All entries have valid id and createdAt`);
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        console.log(`\n--- ${name} Submissions ---`);
        console.log(`  File not found (no submissions yet)`);
        if (expected[key] && expected[key] > 0) {
          console.log(`  ❌ FAIL: Expected ${expected[key]} entries but file doesn't exist`);
          allPassed = false;
        }
      } else {
        throw error;
      }
    }
  }

  console.log(`\n${"=".repeat(40)}`);
  if (allPassed) {
    console.log("✅ ALL INTEGRITY CHECKS PASSED");
    process.exit(0);
  } else {
    console.log("❌ SOME INTEGRITY CHECKS FAILED");
    process.exit(1);
  }
}

verify().catch((err) => {
  console.error("Verification failed with error:", err);
  process.exit(1);
});
