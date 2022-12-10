import { FormOption } from "@prisma/client";
import { z } from "zod";
import { Z_FORM } from "../../../types";
import { publicProcedure, router } from "./../trpc";
export const formsRouter = router({
	getAllPartialForms: publicProcedure.query(async ({ ctx }) => {
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
		const formScore = await ctx.prisma.formScore.createMany({
			data: input.form.formScore.map((score) => ({
				low: score.low,
				high: score.high,
				result: score.result,
				formId: form.id,
			})),
		});
		const formSections = await ctx.prisma.formSection.createMany({
			data: input.form.formSections.map((section) => ({
				sectionTitle: section.sectionTitle,
				sectionDesc: section.sectionDesc,
				seqNumber: section.seqNumber,
				nextSectionID: section.nextSectionID,
				formId: form.id,
			})),
		});
		const formQuestions = await ctx.prisma.formQuestion.createMany({
			data: input.form.formSections.flatMap((section) =>
				section.formQuestions.map((question) => ({
					question: question.question,
					questionType: question.questionType,
					required: question.required,
					score: question.score,
					sequence: question.sequence,
					jumpToSectionBasedOnAnswer: question.jumpToSectionBasedOnAnswer,
					formSectionID: question.formSectionID,
				}))
			),
		});
		const FormOption = await ctx.prisma.formOption.createMany({
			data: input.form.formSections.flatMap((section) =>
				section.formQuestions.flatMap((question) =>
					question.options.map((option) => ({
						optionID: option.optionID,
						optionValue: option.optionValue,
						correct: option.correct,
						nextSectionID: option.nextSectionID,
						questionID: option.questionID,
					}))
				)
			),
		});
		return {
			data: input.form,
			message: "success",
		};
	}),
});
