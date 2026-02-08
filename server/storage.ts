import { db } from "./db";
import { conversions, type InsertConversion, type Conversion } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  getRecentConversions(): Promise<Conversion[]>;
  createConversion(conversion: InsertConversion): Promise<Conversion>;
}

export class DatabaseStorage implements IStorage {
  async getRecentConversions(): Promise<Conversion[]> {
    return await db.select()
      .from(conversions)
      .orderBy(desc(conversions.createdAt))
      .limit(10);
  }

  async createConversion(insertConversion: InsertConversion): Promise<Conversion> {
    const [conversion] = await db.insert(conversions)
      .values(insertConversion)
      .returning();
    return conversion;
  }
}

export const storage = new DatabaseStorage();
