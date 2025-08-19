import { z } from 'zod';

// Game session schema - tracks individual game attempts
export const gameSessionSchema = z.object({
  id: z.number(),
  player_name: z.string(),
  score: z.number().int().nonnegative(),
  items_collected: z.number().int().nonnegative(),
  items_missed: z.number().int().nonnegative(),
  game_duration: z.number().int().nonnegative(), // Duration in seconds
  ended_at: z.coerce.date(),
  created_at: z.coerce.date()
});

export type GameSession = z.infer<typeof gameSessionSchema>;

// High score schema - tracks best performances
export const highScoreSchema = z.object({
  id: z.number(),
  player_name: z.string(),
  score: z.number().int().nonnegative(),
  items_collected: z.number().int().nonnegative(),
  game_duration: z.number().int().nonnegative(),
  achieved_at: z.coerce.date()
});

export type HighScore = z.infer<typeof highScoreSchema>;

// Game item schema - represents collectible items in the game
export const gameItemSchema = z.object({
  id: z.number(),
  item_type: z.enum(['coin', 'gem', 'star', 'power_up']),
  point_value: z.number().int().positive(),
  rarity: z.enum(['common', 'rare', 'epic', 'legendary']),
  sprite_url: z.string().nullable(), // Path to pixel art sprite
  created_at: z.coerce.date()
});

export type GameItem = z.infer<typeof gameItemSchema>;

// Input schema for starting a new game session
export const startGameSessionInputSchema = z.object({
  player_name: z.string().min(1).max(50)
});

export type StartGameSessionInput = z.infer<typeof startGameSessionInputSchema>;

// Input schema for ending a game session
export const endGameSessionInputSchema = z.object({
  session_id: z.number(),
  score: z.number().int().nonnegative(),
  items_collected: z.number().int().nonnegative(),
  items_missed: z.number().int().nonnegative(),
  game_duration: z.number().int().nonnegative()
});

export type EndGameSessionInput = z.infer<typeof endGameSessionInputSchema>;

// Input schema for creating game items
export const createGameItemInputSchema = z.object({
  item_type: z.enum(['coin', 'gem', 'star', 'power_up']),
  point_value: z.number().int().positive(),
  rarity: z.enum(['common', 'rare', 'epic', 'legendary']),
  sprite_url: z.string().nullable()
});

export type CreateGameItemInput = z.infer<typeof createGameItemInputSchema>;

// Input schema for getting high scores with optional limit
export const getHighScoresInputSchema = z.object({
  limit: z.number().int().positive().max(100).optional().default(10)
});

export type GetHighScoresInput = z.infer<typeof getHighScoresInputSchema>;