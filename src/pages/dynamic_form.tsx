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
		const { validateForm } = await import("../utils/validation");
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
