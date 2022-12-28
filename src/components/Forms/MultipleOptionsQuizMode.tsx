import DoneIcon from "@mui/icons-material/Done";
import _cloneDeep from "lodash/cloneDeep";
import type { Dispatch, FC, SetStateAction } from "react";
import type { FORM_OPTIONS_TYPE, FORM_TEMPLATE_TYPE } from "../../types";
import { updateFormTemplate } from "./FormUtils";
type Props = {
	formTemplate: FORM_TEMPLATE_TYPE;
	options: FORM_OPTIONS_TYPE[];
	sectionIdx: number;
	questionIdx: number;
	setFormTemplate: Dispatch<SetStateAction<FORM_TEMPLATE_TYPE>>;
};
const MultipleOptionsQuizMode: FC<Props> = ({ formTemplate, options, sectionIdx, questionIdx, setFormTemplate }) => {
	const handleOptionCorrectChange = (isSelected: boolean, index: number) => {
		if (index < 0) return;
		const tempFormTemplate = updateFormTemplate(formTemplate);
		const newOptions = _cloneDeep(options);
		newOptions[index]!.correct = !isSelected;
		tempFormTemplate.formSections[sectionIdx]!.formQuestions[questionIdx]!.options = newOptions;
		setFormTemplate(tempFormTemplate);
	};
	return (
		<>
			{options.map((option, i) => {
				const isSelected = option.correct ?? false;
				return (
					<div
						key={option.optionValue}
						role="button"
						tabIndex={i}
						onClick={() => handleOptionCorrectChange(isSelected, i)}
						onKeyPress={() => handleOptionCorrectChange(isSelected, i)}
						style={{
							display: "flex",
							justifyContent: "space-between",
							width: "98%",
							backgroundColor: isSelected ? "#e6f4ea" : "inherit",
							alignItems: "center",
							padding: "1px 10px",
							marginTop: "1rem",
							cursor: "pointer",
						}}
					>
						<div style={{ display: "flex", alignItems: "center", gap: 20, paddingBlock: 10 }}>
							<p style={{ alignSelf: "center" }}>{i + 1}.</p>
							<p>{option.optionValue}</p>
						</div>
						{isSelected ? <DoneIcon sx={{ color: "#1e8e3e" }} /> : null}
					</div>
				);
			})}
		</>
	);
};

export default MultipleOptionsQuizMode;
