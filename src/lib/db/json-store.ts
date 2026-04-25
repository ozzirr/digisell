import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";

import type { AppDatabase } from "@/lib/db/types";

const dbPath = path.join(process.cwd(), ".data", "digisell-db.json");

const emptyDb: AppDatabase = {
  customers: [],
  purchases: [],
  progress: [],
  answers: [],
};

async function ensureDbDir() {
  await mkdir(path.dirname(dbPath), { recursive: true });
}

export async function readDb(): Promise<AppDatabase> {
  try {
    const raw = await readFile(dbPath, "utf8");
    const parsed = JSON.parse(raw) as Partial<AppDatabase>;

    return {
      customers: parsed.customers || [],
      purchases: parsed.purchases || [],
      progress: parsed.progress || [],
      answers: parsed.answers || [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return emptyDb;
    }

    throw error;
  }
}

export async function writeDb(db: AppDatabase) {
  await ensureDbDir();
  const tmpPath = `${dbPath}.${Date.now()}.tmp`;
  await writeFile(tmpPath, JSON.stringify(db, null, 2));
  await rename(tmpPath, dbPath);
}

export async function updateDb<T>(updater: (db: AppDatabase) => T | Promise<T>) {
  const db = await readDb();
  const result = await updater(db);
  await writeDb(db);
  return result;
}
