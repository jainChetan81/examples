import { type FORM_TEMPLATE_TYPE } from "../types";
/**
 * ?Form Validations:
 * must have a name
 * must have at least one section
 * every section must have at least one question
 * every section must have an id or null option on every jumpToSection
 * every question of every section if multiple choice must have at least one option
 * every option must have a value
 * if quest is multiple choice and has jump to section based on answer than there must be nextSectionID to every option on every question
 * only one jump to section allowed on a question in a section
 *
 */

export const validateForm = (form: FORM_TEMPLATE_TYPE): string[] => {
	const errors: string[] = [];
	if (!form || !form.formTitle || form.formTitle.length === 0) {
		errors.push("Form name is required");
		return errors;
	}
	if (!form.formSections || form.formSections.length === 0) {
		errors.push("Form must have at least one section");
		return errors;
	}
	form.formSections.forEach((section) => {
		if (!section.sectionTitle || section.sectionTitle.length === 0) {
			errors.push(`Section title for Section ${section.seqNumber + 1} is required`);
		}
		if (
			typeof section.nextSectionID === "string" &&
			section.nextSectionID.length === 0 &&
			section.seqNumber !== form.formSections.length - 1
		) {
			errors.push(`Section ${section.seqNumber + 1} must have jump to section`);
		}
		if (section.formQuestions.length === 0) {
			errors.push(`Section ${section.seqNumber + 1} must have at least one question`);
			return errors;
		}
		section.formQuestions.forEach((question, qIdx) => {
			if (!question.question || question.question.length === 0) {
				errors.push(`Question title for Question ${qIdx + 1} in Section ${section.seqNumber + 1} is required`);
				return errors;
			}
			if (["cb", "dd", "mChoice"].includes(question.questionType)) {
				if (question.options.length === 0) {
					errors.push(`Question ${qIdx + 1} must have at least one option`);
					return errors;
				}
				question.options.forEach((option, oIdx) => {
					if (!option.optionValue || option.optionValue.length === 0) {
						errors.push(
							`Option value for Option ${oIdx + 1} in Question ${qIdx + 1} in Section ${
								section.seqNumber + 1
							} is required`
						);
					}
					if (question.jumpToSectionBasedOnAnswer && !option.nextSectionID) {
						errors.push(`Option ${oIdx + 1} '${option.optionValue}' must have a jump to section`);
					}
				});
			}
		});
	});
	return errors;
};
