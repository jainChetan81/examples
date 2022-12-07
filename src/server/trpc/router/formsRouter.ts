import { z } from "zod";
import { Z_FORM } from "../../../types";
import { publicProcedure, router } from "./../trpc";
export const formsRouter = router({
	getAllForms: publicProcedure.query(async ({ ctx }) => {
		const forms = await ctx.prisma.form.findMany({
			orderBy: {
				createdAt: "desc",
			},
			select: {
				id: true,
				formTitle: true,
				formDescription: true,
				_count: {
					select: {
						formSections: true,
					},
				},
				formSections: {
					select: {
						_count: {
							select: {
								questions: true,
							},
						},
					},
				},
			},
		});
		return forms;
	}),
	addNewForm: publicProcedure.input(z.object({ form: Z_FORM })).mutation(async ({ ctx, input }) => {
		const form = await ctx.prisma.form.create({
			data: {
				formTitle: input.form.formTitle,
				formDescription: input.form.formDescription,
				defaultPointValue: input.form.defaultPointValue,
				isQuizMode: input.form.isQuizMode,
				updatedAt: new Date(),
			},
		});
	}),
});
