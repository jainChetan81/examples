import { router } from "../trpc";
import { commentsRouter } from "./commentsRouter";

export const appRouter = router({
	comments: commentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
