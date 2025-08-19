import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import {
  startGameSessionInputSchema,
  endGameSessionInputSchema,
  createGameItemInputSchema,
  getHighScoresInputSchema
} from './schema';

// Import handlers
import { startGameSession } from './handlers/start_game_session';
import { endGameSession } from './handlers/end_game_session';
import { getHighScores } from './handlers/get_high_scores';
import { getGameItems } from './handlers/get_game_items';
import { createGameItem } from './handlers/create_game_item';
import { getPlayerStats } from './handlers/get_player_stats';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check endpoint
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Game session management
  startGameSession: publicProcedure
    .input(startGameSessionInputSchema)
    .mutation(({ input }) => startGameSession(input)),

  endGameSession: publicProcedure
    .input(endGameSessionInputSchema)
    .mutation(({ input }) => endGameSession(input)),

  // High scores and leaderboard
  getHighScores: publicProcedure
    .input(getHighScoresInputSchema)
    .query(({ input }) => getHighScores(input)),

  // Game items management
  getGameItems: publicProcedure
    .query(() => getGameItems()),

  createGameItem: publicProcedure
    .input(createGameItemInputSchema)
    .mutation(({ input }) => createGameItem(input)),

  // Player statistics
  getPlayerStats: publicProcedure
    .input(z.string().min(1).max(50))
    .query(({ input }) => getPlayerStats(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();