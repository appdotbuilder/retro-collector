import { serial, text, pgTable, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';

// Enums for game items
export const itemTypeEnum = pgEnum('item_type', ['coin', 'gem', 'star', 'power_up']);
export const rarityEnum = pgEnum('rarity', ['common', 'rare', 'epic', 'legendary']);

// Game sessions table - tracks individual game attempts
export const gameSessionsTable = pgTable('game_sessions', {
  id: serial('id').primaryKey(),
  player_name: text('player_name').notNull(),
  score: integer('score').notNull(),
  items_collected: integer('items_collected').notNull(),
  items_missed: integer('items_missed').notNull(),
  game_duration: integer('game_duration').notNull(), // Duration in seconds
  ended_at: timestamp('ended_at').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// High scores table - tracks best performances
export const highScoresTable = pgTable('high_scores', {
  id: serial('id').primaryKey(),
  player_name: text('player_name').notNull(),
  score: integer('score').notNull(),
  items_collected: integer('items_collected').notNull(),
  game_duration: integer('game_duration').notNull(),
  achieved_at: timestamp('achieved_at').defaultNow().notNull(),
});

// Game items table - represents collectible items in the game
export const gameItemsTable = pgTable('game_items', {
  id: serial('id').primaryKey(),
  item_type: itemTypeEnum('item_type').notNull(),
  point_value: integer('point_value').notNull(),
  rarity: rarityEnum('rarity').notNull(),
  sprite_url: text('sprite_url'), // Nullable - path to pixel art sprite
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript types for the table schemas
export type GameSession = typeof gameSessionsTable.$inferSelect;
export type NewGameSession = typeof gameSessionsTable.$inferInsert;

export type HighScore = typeof highScoresTable.$inferSelect;
export type NewHighScore = typeof highScoresTable.$inferInsert;

export type GameItem = typeof gameItemsTable.$inferSelect;
export type NewGameItem = typeof gameItemsTable.$inferInsert;

// Important: Export all tables for proper query building
export const tables = {
  gameSessions: gameSessionsTable,
  highScores: highScoresTable,
  gameItems: gameItemsTable
};