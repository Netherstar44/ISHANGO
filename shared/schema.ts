import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const conversions = pgTable("conversions", {
  id: serial("id").primaryKey(),
  fromSystem: text("from_system").notNull(),
  toSystem: text("to_system").notNull(),
  inputValue: text("input_value").notNull(),
  resultValue: text("result_value").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertConversionSchema = createInsertSchema(conversions).omit({ 
  id: true, 
  createdAt: true 
});

export type Conversion = typeof conversions.$inferSelect;
export type InsertConversion = z.infer<typeof insertConversionSchema>;
