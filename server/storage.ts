import { conversions, type InsertConversion, type Conversion } from "@shared/schema";
import { desc } from "drizzle-orm";

// Optional DB import (only if DATABASE_URL is present)
let db: any = null;
if (process.env.DATABASE_URL) {
  ({ db } = await import("./db"));
}

export interface IStorage {
  getRecentConversions(): Promise<Conversion[]>;
  createConversion(conversion: InsertConversion): Promise<Conversion>;
}

export class DatabaseStorage implements IStorage {
  async getRecentConversions(): Promise<Conversion[]> {
    return await db
      .select()
      .from(conversions)
      .orderBy(desc(conversions.createdAt))
      .limit(10);
  }

  async createConversion(insertConversion: InsertConversion): Promise<Conversion> {
    const [conversion] = await db
      .insert(conversions)
      .values(insertConversion)
      .returning();
    return conversion;
  }
}

export class InMemoryStorage implements IStorage {
  private items: Conversion[] = [];
  private seq = 1;

  async getRecentConversions(): Promise<Conversion[]> {
    return this.items
      .slice()
      .sort((a, b) => (b.createdAt?.getTime?.() || 0) - (a.createdAt?.getTime?.() || 0))
      .slice(0, 10);
  }

  async createConversion(insertConversion: InsertConversion): Promise<Conversion> {
    const now = new Date();
    const item: Conversion = {
      id: this.seq++,
      fromSystem: insertConversion.fromSystem,
      toSystem: insertConversion.toSystem,
      inputValue: insertConversion.inputValue,
      resultValue: insertConversion.resultValue,
      createdAt: now,
    } as Conversion;
    this.items.push(item);
    return item;
  }
}

export const storage: IStorage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new InMemoryStorage();
