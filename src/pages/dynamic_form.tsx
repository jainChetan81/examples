import { Layout } from "../components";
import Loading from "../hoc/Loading";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { type FormEvent, useState } from "react";
import { type FORM_TEMPLATE_TYPE } from "../types";
import FormBuilder from "../components/Forms/FormBuilder";
import FormSettings from "../components/Forms/FormSettings";
const id = uuidv4();
const DynamicForm = () => {
	const [errors, setErrors] = useState<string[]>([]);
	const [tabSelected, setTabSelected] = useState<0 | 1>(0);
	const [formTemplate, setFormTemplate] = useState<FORM_TEMPLATE_TYPE>({
		id: id,
		formTitle: "Untitled Form",
		formDescription: "",
		formSections: [
			{
				formSectionID: uuidv4(),
				sectionTitle: "",
				sectionDescription: "",
				formQuestions: [
					{
						question: "",
						questionID: uuidv4(),
						questionType: "varchar",
						required: false,
						score: 12,
						sequence: 0,
						jumpToSectionBasedOnAnswer: false,
						options: [
							{
								correct: null,
								optionValue: "",
								nextSection: null,
							},
						],
					},
				],
				seqNumber: 0,
				nextSection: "TERMINATE",
			},
		],
		defaultPointValue: 12,
		formScore: [],
		isQuizMode: 0,
		createdTs: moment().valueOf(),
		lastModifiedTs: moment().valueOf(),
	});
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newErrors = validateForm(formTemplate);
		setErrors(newErrors);
		if (newErrors.length > 0) return;
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
 * every section must have an id or "TERMINATE" option on every jumpToSection
 * every question of every section if multiple choice must have at least one option
 * every option must have a value
 * if quest is multiple choice and has jump to section based on answer than there must be nextSection to every option on every question
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
			(!section.nextSection || section.nextSection.length === 0) &&
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
					if (question.jumpToSectionBasedOnAnswer && !option.nextSection) {
						errors.push(`Option ${oIdx + 1} '${option.optionValue}' must have a jump to section`);
					}
				});
			}
		});
	});
	return errors;
};
