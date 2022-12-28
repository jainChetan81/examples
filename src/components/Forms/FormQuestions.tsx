import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	Button,
	Divider,
	FormControl,
	FormHelperText,
	Input,
	Menu,
	MenuItem,
	Select,
	Switch,
	TextField,
	type SelectChangeEvent,
} from "@mui/material";
import _cloneDeep from "lodash/cloneDeep";
import { useState, type ChangeEvent, type Dispatch, type FC, type SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import type { FORM_QUESTION_TYPE, FORM_TEMPLATE_TYPE, QUESTION_TYPES } from "../../types";
import {
	getQuestionTypeEdit,
	getQuestionTypeView,
	ITEM_HEIGHT,
	MenuProps,
	names,
	switchLabel,
	updateFormTemplate,
} from "./FormUtils";

type Props = {
	question: FORM_QUESTION_TYPE;
	currentElementId: string | null;
	id: string | null; //id of the current question
	index: number; //index of current question in the section
	setFormTemplate: Dispatch<SetStateAction<FORM_TEMPLATE_TYPE>>;
	formTemplate: FORM_TEMPLATE_TYPE;
	formSectionIndex: number;
	length: number; //length of all the questions in the section
};
const FormQuestions: FC<Props> = ({
	question,
	id,
	currentElementId,
	index,
	formTemplate,
	setFormTemplate,
	formSectionIndex,
	length,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [scoreMode, setScoreMode] = useState(false);

	const changeSectionJump = (value: boolean) => {
		const tempFormTemplate = updateFormTemplate(formTemplate);
		const numberOfQuestionsWithJump = tempFormTemplate.formSections[formSectionIndex]!.formQuestions.reduce(
			(acc, q) => acc + (q.jumpToSectionBasedOnAnswer ? 1 : 0),
			0
		);
		if (numberOfQuestionsWithJump === 1 && value === true) {
			console.log({
				message: "Only one question per section can have 'Go to Section' enabled",
				severity: "error",
			});
			return;
		}
		tempFormTemplate.formSections[formSectionIndex]!.formQuestions[index]!.jumpToSectionBasedOnAnswer = value;
		// if value is false then make nextSectionID null instead of old value
		if (value === false) {
			tempFormTemplate.formSections[formSectionIndex]!.formQuestions[index]!.options.forEach((option) => {
				option.nextSectionID = null;
			});
		}
		setAnchorEl(null);
		setFormTemplate(tempFormTemplate);
	};

	const handleRequiredQuestion = (event: any) => {
		const tempFormTemplate = updateFormTemplate(formTemplate);
		const value =
			typeof event.target.checked === "boolean"
				? event.target.checked
				: !tempFormTemplate.formSections[formSectionIndex]!.formQuestions[index]!.required;
		tempFormTemplate.formSections[formSectionIndex]!.formQuestions[index]!.required = value;
		setFormTemplate(tempFormTemplate);
	};

	const handleDeleteQuestion = () => {
		if (length === 1) {
			console.log({ message: "Only Question of a Section cannot be deleted", severity: "error" });
			return;
		}

		const tempFormTemplate = updateFormTemplate(formTemplate);
		const tempFormSections = _cloneDeep(tempFormTemplate.formSections);
		let tempFormQuestions = _cloneDeep(tempFormSections[formSectionIndex]!.formQuestions);
		tempFormQuestions.splice(index, 1);
		tempFormQuestions = _cloneDeep(tempFormQuestions).map((q, idx) => ({ ...q, sequence: idx }));
		tempFormQuestions.forEach((q, i) => {
			q.sequence = i;
		});
		tempFormTemplate.formSections[formSectionIndex]!.formQuestions = [...tempFormQuestions];
		setFormTemplate(tempFormTemplate);
	};

	const handleChangeQuestionType = (event: SelectChangeEvent<QUESTION_TYPES>) => {
		const { value } = event.target;
		const tempFormTemplate = updateFormTemplate(formTemplate);
		// @ts-expect-error dsd
		tempFormTemplate.formSections[formSectionIndex].formQuestions[index].questionType = value;
		// turn clients in range false if question type is not "clients"
		setFormTemplate(tempFormTemplate);
	};

	const handleDuplicateQuestion = () => {
		const tempFormTemplate = updateFormTemplate(formTemplate);
		const tempFormSections = _cloneDeep(tempFormTemplate.formSections);
		let tempFormQuestions = _cloneDeep(tempFormSections[formSectionIndex]!.formQuestions);
		const newQuestion = _cloneDeep(tempFormSections[formSectionIndex]!.formQuestions[index]);
		if (!newQuestion) return;

		newQuestion.questionID = uuidv4();

		let tempQuestionsFormOption = _cloneDeep(newQuestion.options || []);
		tempQuestionsFormOption = tempQuestionsFormOption.map((option) => ({
			...option,
		}));

		newQuestion["options"] = tempQuestionsFormOption;

		tempFormQuestions.splice(index + 1, 0, newQuestion);
		tempFormQuestions = _cloneDeep(tempFormQuestions).map((q, idx) => ({ ...q, sequence: idx }));
		tempFormQuestions.forEach((q, i) => {
			q.sequence = i;
		});
		tempFormTemplate.formSections[formSectionIndex]!.formQuestions = [...tempFormQuestions];
		setFormTemplate(tempFormTemplate);
	};

	const handleQuestionChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const tempFormTemplate = updateFormTemplate(formTemplate);
		tempFormTemplate.formSections[formSectionIndex]!.formQuestions[index]!.question = e.target.value;
		setFormTemplate(tempFormTemplate);
	};

	const changeQuestionScore = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (isNaN(value) || value < 0) return;
		const tempFormTemplate = updateFormTemplate(formTemplate);
		tempFormTemplate.formSections[formSectionIndex]!.formQuestions[index]!.score = parseInt(e.target.value, 10);
		setFormTemplate(tempFormTemplate);
	};

	return (
		<>
			<div className="form_builder-question-indicator">
				<DragIndicatorIcon />
			</div>
			<div className="title">
				{currentElementId === id ? (
					scoreMode ? (
						<div style={{ display: "flex", alignItems: "center", width: "100%" }}>
							<EventAvailableIcon />
							<p style={{ alignSelf: "center", marginLeft: "1rem" }}>Choose correct answers:</p>
							<FormControl variant="filled" size="small" sx={{ width: 80, marginLeft: "auto", fontSize: "1rem" }}>
								<Input
									id="filled-adornment-score"
									type="number"
									value={question.score ?? 12}
									onChange={changeQuestionScore}
								/>
								<FormHelperText id="filled-adornment-score">points</FormHelperText>
							</FormControl>
						</div>
					) : (
						<div className="type_select">
							<TextField
								className="question_input"
								variant="standard"
								name="question"
								placeholder="Question"
								required
								value={question.question ?? ""}
								onChange={handleQuestionChange}
							/>
							<FormControl sx={{ width: 250 }}>
								<Select
									MenuProps={MenuProps}
									value={question.questionType ?? "mChoice"}
									onChange={handleChangeQuestionType}
								>
									{names.map((name, i) => (
										<MenuItem key={i} value={name.key}>
											{name.icon}
											<span style={{ marginLeft: 20 }}>{name.name}</span>
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
					)
				) : (
					<h5>{question.question || <span className="error">Fill this Question</span>}</h5>
				)}
			</div>
			{currentElementId === id
				? getQuestionTypeEdit(
						formTemplate,
						question.options,
						question.questionType,
						question.jumpToSectionBasedOnAnswer || false,
						index,
						formSectionIndex,
						setFormTemplate,
						scoreMode
				  )
				: getQuestionTypeView(question.options, question.questionType)}
			<p style={{ textAlign: "right" }}>Question Sequence {question.sequence}</p>
			{currentElementId === id &&
				(scoreMode ? (
					<Button
						type="button"
						size="small"
						variant="outlined"
						onClick={() => setScoreMode(false)}
						sx={{ width: 100, marginLeft: "auto" }}
					>
						Done
					</Button>
				) : (
					<div className="question_footer">
						{["mChoice", "cb", "dd"].includes(question.questionType) && formTemplate.isQuizMode && (
							<div className="points">
								<button title="Answer key and points" onClick={() => setScoreMode(true)} type="button">
									<EventAvailableIcon sx={{ color: "#1a73e8" }} />
									<p style={{ color: "#1a73e8" }}>Answer Key</p>
								</button>
								<p style={{ color: "#5f6368" }}>({question.score ?? 0} points)</p>
							</div>
						)}
						<div className="buttons">
							<button title="Duplicate" onClick={handleDuplicateQuestion} type="button">
								<ContentCopyIcon className="copy_icon" />
							</button>
							<button title="Delete" onClick={handleDeleteQuestion} type="button">
								<DeleteOutlineIcon />
							</button>
							<Divider orientation="vertical" flexItem />
							<span style={{ marginLeft: "1rem" }}>Required</span>
							<Switch checked={question.required} {...switchLabel} onClick={handleRequiredQuestion} />
							{["dd", "mChoice"].includes(question.questionType) && (
								<>
									<button
										type="button"
										aria-controls={open ? "basic-menu" : undefined}
										aria-haspopup="true"
										aria-expanded={open ? "true" : undefined}
										onClick={(e) => setAnchorEl(e.currentTarget)}
									>
										<MoreVertIcon color="action" />
									</button>
									<Menu
										anchorEl={anchorEl}
										open={open}
										onClose={() => setAnchorEl(null)}
										PaperProps={{
											style: {
												maxHeight: ITEM_HEIGHT * 4.5,
											},
										}}
									>
										<MenuItem selected={question.jumpToSectionBasedOnAnswer ?? false}>
											<button
												type="button"
												className="center"
												style={{ gap: 10 }}
												onClick={() => changeSectionJump(!question.jumpToSectionBasedOnAnswer)}
											>
												{question.jumpToSectionBasedOnAnswer ? <DoneIcon /> : null}
												Go To Section Based On Answer
											</button>
										</MenuItem>
									</Menu>
								</>
							)}
						</div>
					</div>
				))}
		</>
	);
};

export default FormQuestions;
