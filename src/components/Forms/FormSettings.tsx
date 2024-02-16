import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import WarningIcon from "@mui/icons-material/Warning";
import {
	Button,
	FormControl,
	FormHelperText,
	Input,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Tooltip,
} from "@mui/material";
import _cloneDeep from "lodash/cloneDeep";
import { type ChangeEvent, type Dispatch, type FC, type SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { FORM_TEMPLATE_TYPE } from "../../types";
import { updateFormTemplate } from "./FormUtils";
type Props = {
	formTemplate: FORM_TEMPLATE_TYPE;
	setFormTemplate: Dispatch<SetStateAction<FORM_TEMPLATE_TYPE>>;
};
const FormSettings: FC<Props> = ({ formTemplate, setFormTemplate }) => {
	const quizMode = formTemplate.isQuizMode ? true : false;
	const [currentRowId, setCurrentRowId] = useState("");
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const changeQuizMode = (e: any) => {
		const tempFormTemplate = updateFormTemplate(formTemplate);
		tempFormTemplate.isQuizMode = e.target.checked;
		setFormTemplate(tempFormTemplate);
	};

	const changeFormScore = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const tempFormTemplate = updateFormTemplate(formTemplate);
		tempFormTemplate.defaultPointValue = parseInt(e.target.value);
		setFormTemplate(tempFormTemplate);
	};

	const addFormScoreRow = () => {
		const tempFormTemplate = updateFormTemplate(formTemplate);
		tempFormTemplate.formScore.push({
			low: 0,
			high: 0,
			result: "",
			id: uuidv4(),
			formId: formTemplate.id,
		});
		setFormTemplate(tempFormTemplate);
	};
	const removeOption = (index: number) => {
		if (isNaN(index)) return;
		const tempFormTemplate = updateFormTemplate(formTemplate);
		tempFormTemplate.formScore.splice(index, 1);
		setFormTemplate(tempFormTemplate);
	};
	const updateFormScore = (index: number, key: "low" | "high" | "result", value: number | string) => {
		if (!["low", "high", "result"].includes(key)) return;
		const tempFormTemplate = updateFormTemplate(formTemplate);
		// @ts-expect-error sdsds
		tempFormTemplate.formScore[index][key] = value;
		setFormTemplate(tempFormTemplate);
	};

	const shouldShowWarning = (rowScoreID: string | null, value: number | string | null, isResult = false) => {
		let numberOfOccurrence = 0;
		if (!rowScoreID || !value) return false;
		const formScore = _cloneDeep(formTemplate["formScore"]);
		formScore.forEach((d) => {
			if (isResult) {
				if (value === d.result && d.id !== rowScoreID) {
					numberOfOccurrence += 1;
				}
			} else {
				if (d.high && d.low && +value >= d.low && +value <= d.high && d.id !== rowScoreID) {
					numberOfOccurrence += 1;
				}
			}
		});
		return numberOfOccurrence === 1 && rowScoreID === currentRowId;
	};

	return (
		<div className="form_settings">
			<h3>Settings</h3>
			<hr />
			<div className="form_settings-quiz">
				<label htmlFor="quiz">
					<h4>Make this a quiz</h4>
					<p>Assign point values, set answers and automatically provide feedback</p>
				</label>
				<Switch checked={quizMode} id="quiz" onClick={changeQuizMode} />
			</div>
			{quizMode && (
				<div className="form_settings-score">
					<label htmlFor="score">
						<h4>Default question point value</h4>
						<p>Result on the basis of score range</p>
					</label>
					<div style={{ marginLeft: "auto" }}>
						<FormControl variant="filled">
							<Input
								id="filled-adornment-score"
								required
								type="number"
								value={formTemplate.defaultPointValue}
								onChange={changeFormScore}
							/>
							<FormHelperText id="filled-adornment-score">points</FormHelperText>
						</FormControl>
					</div>
					<label htmlFor="score">
						<h4>Form Score Rule</h4>
						<p>Result on the basis of score range</p>
					</label>
					<div></div>
					<Table sx={{ marginTop: "1rem", gridColumn: "span 2/auto" }}>
						<TableHead>
							<TableRow>
								<TableCell>From</TableCell>
								<TableCell align="left">To</TableCell>
								<TableCell align="left">Result</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{formTemplate.formScore.map((row, i) => (
								<TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
									<TableCell component="th" scope="row">
										<div style={{ display: "flex", alignItems: "center" }}>
											<TextField
												variant="standard"
												type="number"
												value={row.low}
												onChange={(e) => updateFormScore(i, "low", parseInt(e.target.value))}
												onFocus={() => setCurrentRowId(row.id || "")}
											/>
											{shouldShowWarning(row.id, row.low) && (
												<Tooltip title="Duplicate options not supported">
													<WarningIcon sx={{ color: "#ff7700" }} />
												</Tooltip>
											)}
										</div>
									</TableCell>
									<TableCell align="left">
										<div style={{ display: "flex", alignItems: "center" }}>
											<TextField
												type="number"
												variant="standard"
												value={row.high}
												onChange={(e) => updateFormScore(i, "high", parseInt(e.target.value))}
												onFocus={() => setCurrentRowId(row.id || "")}
											/>
											{shouldShowWarning(row.id, row.high) && (
												<Tooltip title="Form score rule should have exclusive range">
													<WarningIcon sx={{ color: "#ff7700" }} />
												</Tooltip>
											)}
										</div>
									</TableCell>
									<TableCell align="left">
										<div style={{ display: "flex", alignItems: "center" }}>
											<TextField
												variant="standard"
												value={row.result}
												onChange={(e) => updateFormScore(i, "result", e.target.value)}
												onFocus={() => setCurrentRowId(row.id || "")}
											/>
											{shouldShowWarning(row.id, row.result) && (
												<Tooltip title="Form score rule should have exclusive range">
													<WarningIcon sx={{ color: "#ff7700" }} />
												</Tooltip>
											)}
										</div>
									</TableCell>
									<TableCell>
										<button title="Remove" type="button" onClick={() => removeOption(i)}>
											<ClearIcon sx={{ color: "rgba(0,0,0,0.54)" }} />
										</button>
									</TableCell>
								</TableRow>
							))}
							<Button
								variant="text"
								sx={{ marginTop: "1rem" }}
								onClick={addFormScoreRow}
								size="small"
								startIcon={<AddIcon />}
							>
								Add Row
							</Button>
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
};

export default FormSettings;
