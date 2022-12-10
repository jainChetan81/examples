import { Layout } from "../components";
import Loading from "../hoc/Loading";
import { v4 as uuidv4 } from "uuid";
import { type FormEvent, useState } from "react";
import { type FORM_TEMPLATE_TYPE } from "../types";
import FormBuilder from "../components/Forms/FormBuilder";
import FormSettings from "../components/Forms/FormSettings";
import { trpc } from "../utils/trpc";
const formId = uuidv4();
const sectionId = uuidv4();
const questionId = uuidv4();
const optionId = uuidv4();
const DynamicForm = () => {
	const { mutateAsync: addForm, error } = trpc.forms.addNewForm.useMutation();
	const [errors, setErrors] = useState<string[]>([]);
	const [tabSelected, setTabSelected] = useState<0 | 1>(0);
	const [formTemplate, setFormTemplate] = useState<FORM_TEMPLATE_TYPE>({
		id: formId,
		formTitle: "Untitled Form",
		formDescription: "",
		defaultPointValue: 12,
		formScore: [],
		isQuizMode: false,
		createdAt: new Date(),
		updatedAt: new Date(),
		formSections: [
			{
				formId: formId,
				formSectionID: sectionId,
				sectionTitle: "",
				sectionDesc: "",
				formQuestions: [
					{
						formSectionID: sectionId,
						question: "",
						questionID: questionId,
						questionType: "varchar",
						required: false,
						score: 12,
						sequence: 0,
						jumpToSectionBasedOnAnswer: false,
						options: [
							{
								optionValue: "",
								optionID: optionId,
								nextSectionID: null,
								correct: null,
								questionID: questionId,
							},
						],
					},
				],
				seqNumber: 0,
				nextSectionID: null,
			},
		],
	});
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newErrors = validateForm(formTemplate);
		setErrors(newErrors);
		if (newErrors.length > 0) return;
		await addForm({ form: formTemplate });
	};
	return (
		<Layout title="Dynamic Forms">
			<section className="forms datagrid-common-style">
				<form onSubmit={handleSubmit}>
					<header>
						<div className="button-group">
							<button
								type="button"
								onClick={() => setTabSelected(0)}
								className={`group ${tabSelected === 0 ? "selected" : ""}`}
							>
								Questions
							</button>
							<button
								type="button"
								onClick={() => setTabSelected(1)}
								className={`group ${tabSelected === 1 ? "selected" : ""}`}
							>
								Settings
							</button>
							<button type="submit">Save Form</button>
						</div>
					</header>
					<ul className="errors">
						{errors.map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
					{tabSelected === 0 ? (
						<FormBuilder formTemplate={formTemplate} setFormTemplate={setFormTemplate} />
					) : (
						<FormSettings formTemplate={formTemplate} setFormTemplate={setFormTemplate} />
					)}
				</form>
			</section>
		</Layout>
	);
};

export default Loading(DynamicForm);

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
