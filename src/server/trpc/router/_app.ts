import { router } from "../trpc";
import { formsRouter } from "./formsRouter";

export const appRouter = router({
	forms: formsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
