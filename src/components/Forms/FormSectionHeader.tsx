import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, TextField } from "@mui/material";
import _cloneDeep from "lodash/cloneDeep";
import { type ChangeEvent, type Dispatch, type FC, type SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { FORM_QUESTION_TYPE, FORM_TEMPLATE_TYPE } from "../../types";
import { updateFormSection, updateFormTemplate } from "./FormUtils";
type Props = {
	id: string; //uuid of current section
	sectionTitle: string;
	sectionDescription: string;
	length: number; //length of all the sections
	index: number; //index of current section in the form
	currentElementId: string | null;
	setFormTemplate: Dispatch<SetStateAction<FORM_TEMPLATE_TYPE>>;
	formTemplate: FORM_TEMPLATE_TYPE;
};
const FormSectionHeader: FC<Props> = ({
	id,
	sectionTitle,
	sectionDescription,
	length,
	index,
	currentElementId,
	setFormTemplate,
	formTemplate,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const { value, name } = e.target;
		const { tempFormTemplate } = updateFormSection(formTemplate, 0);
		// @ts-expect-error sddsf
		tempFormTemplate.formSections[index][name] = value;
		if (name === "sectionTitle" && index === 0) tempFormTemplate.formTitle = value;
		if (name === "sectionDescription") tempFormTemplate.formDescription = value;
		setFormTemplate(tempFormTemplate);
	};

	const duplicateSection = () => {
		const { tempFormTemplate } = updateFormTemplate(formTemplate);
		let tempFormSections = _cloneDeep(tempFormTemplate["formSections"]);
		const newSection = _cloneDeep(tempFormSections[index]);
		if (!newSection) return;
		newSection.formSectionID = uuidv4();
		newSection.nextSection = "TERMINATE";
		let tempQuestionsFormSection = _cloneDeep(newSection?.formQuestions) ?? [];
		tempQuestionsFormSection = tempQuestionsFormSection.map((question) => {
			let tempQuestionsFormOption = _cloneDeep(question["options"]);
			tempQuestionsFormOption = tempQuestionsFormOption.map((option) => ({
				...option,
			}));

			return {
				...question,
				questionID: uuidv4(),
				options: tempQuestionsFormOption,
			};
		});
		newSection.formQuestions = tempQuestionsFormSection;
		// since, duplicated new section is being created right under the old one, the old one should automatically point towards the new one as nextSection
		tempFormSections[index]!.nextSection = newSection.formSectionID;
		tempFormSections.splice(index + 1, 0, newSection);

		tempFormSections = tempFormSections.map((section, idx) => ({ ...section, seqNumber: idx }));
		tempFormTemplate.formSections = tempFormSections;
		setFormTemplate(tempFormTemplate);
	};

	const deleteSection = () => {
		if (length <= 1) {
			console.log({ message: "Only section cannot be deleted", severity: "error" });
			return;
		}
		if (index === 0) {
			console.log({ message: "First section cannot be deleted", severity: "error" });
			return;
		}
		const numberOfSectionLinkedToCurrentSection = formTemplate.formSections.filter(
			(section) => section.nextSection === id
		).length;
		if (numberOfSectionLinkedToCurrentSection > 0) {
			console.log({
				message: `Section is linked to ${numberOfSectionLinkedToCurrentSection} other Section(s)`,
				severity: "error",
			});
			return;
		}
		const { tempFormTemplate } = updateFormTemplate(formTemplate);
		let tempFormSections = [...tempFormTemplate.formSections];
		tempFormSections.splice(index, 1);
		tempFormSections = tempFormSections.map((section, idx) => {
			const tempFormQuestion: FORM_QUESTION_TYPE[] = section.formQuestions.map((question) => {
				const tempFormOptions = question["options"].map((option) => {
					if (option.nextSection !== null && option.nextSection === id) {
						return { ...option, nextSection: tempFormSections[0]!.formSectionID };
					} else {
						return option;
					}
				});
				return { ...question, options: tempFormOptions };
			});
			return { ...section, formQuestions: tempFormQuestion, seqNumber: idx };
		});
		tempFormTemplate.formSections = [...tempFormSections];
		setFormTemplate({ ...tempFormTemplate });
	};
	return (
		<>
			<div className="form_builder-section--header">
				Section {index + 1} of {length}
			</div>
			<div className="title">
				{currentElementId === id ? (
					<TextField
						fullWidth
						variant="standard"
						placeholder="Enter Title"
						name="sectionTitle"
						required
						value={sectionTitle}
						onChange={handleChangeTitle}
					/>
				) : (
					<h4>{sectionTitle || <span className="error">Untitled Section</span>}</h4>
				)}

				<button
					type="button"
					aria-controls={open ? "basic-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					onClick={(e) => setAnchorEl(e.currentTarget)}
				>
					<MoreVertOutlinedIcon color="action" />
				</button>
				<Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
					<MenuItem onClick={() => setAnchorEl(null)}>
						<button type="button" onClick={duplicateSection}>
							Duplicate Section
						</button>
					</MenuItem>
					<MenuItem onClick={() => setAnchorEl(null)}>
						<button type="button" onClick={deleteSection}>
							Delete Section
						</button>
					</MenuItem>
				</Menu>
			</div>
			{currentElementId === id ? (
				<TextField
					fullWidth
					variant="standard"
					placeholder="Form Description"
					value={sectionDescription}
					name="sectionDescription"
					onChange={handleChangeTitle}
				/>
			) : (
				<p>{sectionDescription || "Untitled Description"}</p>
			)}
			<p style={{ textAlign: "right" }}>Section Sequence: {formTemplate.formSections[index]!.seqNumber}</p>
		</>
	);
};

export default FormSectionHeader;
