import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { v4 as uuidv4 } from "uuid";
import { Button, FormControl, MenuItem, Select, type SelectChangeEvent, TextField } from "@mui/material";
import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import type { FORM_OPTIONS_TYPE, FORM_TEMPLATE_TYPE, QUESTION_TYPES } from "../../../types";
import { updateFormQuestion } from "../FormUtils";
type Props = {
	formTemplate: FORM_TEMPLATE_TYPE;
	options: FORM_OPTIONS_TYPE[];
	jump: boolean;
	sectionIdx: number;
	questionIdx: number;
	questionType: QUESTION_TYPES;
	setFormTemplate: Dispatch<SetStateAction<FORM_TEMPLATE_TYPE>>;
};
const MultipleOptions: FC<Props> = ({
	formTemplate,
	options,
	jump,
	questionType,
	sectionIdx,
	questionIdx,
	setFormTemplate,
}) => {
	const quizMode = Boolean(formTemplate.isQuizMode);
	const addNewOption = () => {
		const { tempFormTemplate } = updateFormQuestion(formTemplate, sectionIdx, questionIdx);

		const optionData: FORM_OPTIONS_TYPE = {
			optionValue: "",
			nextSectionID: jump ? formTemplate["formSections"]![0]!["formSectionID"] : null,
			correct: quizMode ? false : null,
			questionID: tempFormTemplate.formSections[sectionIdx]!.formQuestions[questionIdx]!.questionID,
			optionID: uuidv4(),
		};
		tempFormTemplate.formSections[sectionIdx]!.formQuestions[questionIdx]!.options.push(optionData);
		setFormTemplate(tempFormTemplate);
	};

	const removeOption = (optionIdx: number) => {
		if (options.length <= 1) {
			console.log({ message: "Only Option of a Question cannot be deleted", severity: "error" });
			return;
		}
		const { tempFormTemplate } = updateFormQuestion(formTemplate, sectionIdx, questionIdx);
		tempFormTemplate.formSections[sectionIdx]!.formQuestions[questionIdx]!.options.splice(optionIdx, 1);
		setFormTemplate(tempFormTemplate);
	};

	const changeOptionValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, optionIdx: number) => {
		const { tempFormTemplate } = updateFormQuestion(formTemplate, sectionIdx, questionIdx);
		tempFormTemplate.formSections[sectionIdx]!.formQuestions[questionIdx]!.options[optionIdx]!.optionValue =
			e.target.value;
		setFormTemplate(tempFormTemplate);
	};

	const changeJumpToSection = (e: SelectChangeEvent<string | null>, optionIdx: number) => {
		const { tempFormTemplate } = updateFormQuestion(formTemplate, sectionIdx, questionIdx);
		tempFormTemplate.formSections[sectionIdx]!.formQuestions[questionIdx]!.options[optionIdx]!.nextSectionID =
			e.target.value;
		setFormTemplate(tempFormTemplate);
	};

	return (
		<>
			{options.map((option, idx) => (
				<div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
					<p style={{ flexGrow: 1, alignSelf: "center" }}>{idx + 1}.</p>
					{questionType === "mChoice" && <CircleOutlinedIcon sx={{ color: "rgba(0,0,0,0.54)" }} />}
					{questionType === "cb" && <CheckBoxOutlineBlankIcon sx={{ color: "rgba(0,0,0,0.54)" }} />}
					{questionType === "dd" && <ArrowDropDownCircleIcon sx={{ color: "rgba(0,0,0,0.54)" }} />}
					<TextField
						fullWidth
						required
						variant="standard"
						placeholder={`Option ${idx + 1}`}
						value={option.optionValue}
						onChange={(e) => changeOptionValue(e, idx)}
					/>
					{quizMode && option.correct ? <DoneIcon sx={{ color: "#1e8e3e" }} /> : null}
					{options.length > 1 ? (
						<button type="button" title="Remove" onClick={() => removeOption(idx)}>
							<ClearIcon sx={{ color: "rgba(0,0,0,0.54)" }} />
						</button>
					) : null}
					{jump ? (
						<FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
							<Select value={option.nextSectionID || ""} onChange={(e) => changeJumpToSection(e, idx)} required>
								{formTemplate.formSections.map((section) => (
									<MenuItem key={section.formSectionID} value={section.formSectionID}>
										{section.sectionTitle}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					) : null}
				</div>
			))}
			<div className="question__type">
				<Button type="button" style={{ color: "rgba(0,0,0,0.54)" }} onClick={addNewOption}>
					Add Option
				</Button>
			</div>
		</>
	);
};

export default MultipleOptions;
