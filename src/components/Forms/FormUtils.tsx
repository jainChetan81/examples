import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EventIcon from "@mui/icons-material/Event";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Filter1Icon from "@mui/icons-material/Filter1";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import SegmentIcon from "@mui/icons-material/Segment";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import _cloneDeep from "lodash/cloneDeep";
import type { Dispatch, SetStateAction } from "react";
import type { FORM_OPTIONS_TYPE, FORM_TEMPLATE_TYPE, QUESTION_TYPES } from "../../types";
import MultipleOptions from "./options/MultipleOptions";
import MultipleOptionsQuizMode from "./options/MultipleOptionsQuizMode";

export const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const updateFormTemplate = (formTemplate: FORM_TEMPLATE_TYPE): FORM_TEMPLATE_TYPE => {
	const tempFormTemplate = _cloneDeep(formTemplate);
	return tempFormTemplate;
};

export const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		},
	},
};

export const switchLabel = { inputProps: { "aria-label": "Required Question" } };

export const names = [
	{
		key: "varchar",
		name: "Paragraph",
		icon: <SegmentIcon />,
	},
	{
		key: "mChoice",
		name: "Multiple Choice",
		icon: <RadioButtonCheckedIcon />,
	},
	{
		key: "cb",
		name: "Checkbox",
		icon: <CheckBoxIcon />,
	},
	{
		key: "photo",
		name: "Photo",
		icon: <AddPhotoAlternateOutlinedIcon />,
	},
	{
		key: "dd",
		name: "Drop-down",
		icon: <ArrowDropDownCircleIcon />,
	},
	{
		key: "int",
		name: "Number",
		icon: <Filter1Icon />,
	},
	{
		key: "file",
		name: "File Upload",
		icon: <CloudUploadIcon />,
	},
	{
		key: "date",
		name: "Date",
		icon: <EventIcon />,
	},
	{
		key: "address",
		name: "Address",

		icon: <ShareLocationIcon />,
	},
];

export const getQuestionTypeView = (options: FORM_OPTIONS_TYPE[], questionType: QUESTION_TYPES) => {
	const questionTypeView = new Map<QUESTION_TYPES, JSX.Element | JSX.Element[]>();
	questionTypeView.set("varchar", Varchar);
	questionTypeView.set("int", Int);
	questionTypeView.set("file", File);
	questionTypeView.set("photo", Photo);
	questionTypeView.set("date", Date);
	questionTypeView.set("address", Address);
	questionTypeView.set(
		"mChoice",
		options.map((option, i) => (
			<div className="question__type" key={i}>
				<p style={{ marginRight: "0.5rem" }}>{i + 1}.</p>
				<CircleOutlinedIcon sx={{ color: "rgba(0,0,0,0.54)", marginRight: "0.5rem" }} />
				<p>{option.optionValue || <span className="error">Fill this option</span>}</p>
			</div>
		))
	);
	questionTypeView.set(
		"cb",
		options.map((option, i) => (
			<div className="question__type" key={i}>
				<p style={{ marginRight: "0.5rem" }}>{i + 1}.</p>
				<CheckBoxOutlineBlankOutlinedIcon sx={{ color: "rgba(0,0,0,0.54)", marginRight: "0.5rem" }} />
				<p>{option.optionValue || <span className="error">Fill this option</span>}</p>
			</div>
		))
	);
	questionTypeView.set(
		"dd",
		options.map((option, idx) => (
			<div className="question__type" key={idx}>
				<p style={{ marginRight: "0.5rem" }}>{idx + 1}.</p>
				<ArrowDropDownCircleIcon sx={{ color: "rgba(0,0,0,0.54)", marginRight: "0.5rem" }} />
				<p>{option.optionValue || <span className="error">Fill this option</span>}</p>
			</div>
		))
	);

	return questionTypeView.get(questionType);
};

export const getQuestionTypeEdit = (
	formTemplate: FORM_TEMPLATE_TYPE,
	options: FORM_OPTIONS_TYPE[],
	questionType: QUESTION_TYPES,
	jump: boolean,
	questionIdx: number,
	sectionIdx: number,
	setFormTemplate: Dispatch<SetStateAction<FORM_TEMPLATE_TYPE>>,
	scoreMode: boolean
) => {
	const questionTypeEdit = new Map<QUESTION_TYPES, JSX.Element>();
	questionTypeEdit.set("varchar", Varchar);
	questionTypeEdit.set("date", Date);
	questionTypeEdit.set("file", File);
	questionTypeEdit.set("photo", Photo);
	questionTypeEdit.set("address", Address);
	questionTypeEdit.set("int", Int);
	questionTypeEdit.set(
		"mChoice",
		scoreMode ? (
			<MultipleOptionsQuizMode
				formTemplate={formTemplate}
				options={options}
				questionIdx={questionIdx}
				sectionIdx={sectionIdx}
				setFormTemplate={setFormTemplate}
			/>
		) : (
			<MultipleOptions
				questionType={questionType}
				formTemplate={formTemplate}
				options={options}
				jump={jump}
				questionIdx={questionIdx}
				sectionIdx={sectionIdx}
				setFormTemplate={setFormTemplate}
			/>
		)
	);
	questionTypeEdit.set(
		"cb",
		scoreMode ? (
			<MultipleOptionsQuizMode
				formTemplate={formTemplate}
				options={options}
				questionIdx={questionIdx}
				sectionIdx={sectionIdx}
				setFormTemplate={setFormTemplate}
			/>
		) : (
			<MultipleOptions
				questionType={questionType}
				formTemplate={formTemplate}
				options={options}
				jump={jump}
				questionIdx={questionIdx}
				sectionIdx={sectionIdx}
				setFormTemplate={setFormTemplate}
			/>
		)
	);
	questionTypeEdit.set(
		"dd",
		scoreMode ? (
			<MultipleOptionsQuizMode
				formTemplate={formTemplate}
				options={options}
				questionIdx={questionIdx}
				sectionIdx={sectionIdx}
				setFormTemplate={setFormTemplate}
			/>
		) : (
			<MultipleOptions
				questionType={questionType}
				formTemplate={formTemplate}
				options={options}
				jump={jump}
				questionIdx={questionIdx}
				sectionIdx={sectionIdx}
				setFormTemplate={setFormTemplate}
			/>
		)
	);
	return questionTypeEdit.get(questionType);
};

const Address = (
	<div className="question__type">
		<p>Address</p>
		<ShareLocationIcon sx={{ color: "rgba(0,0,0,0.54)", marginLeft: "2rem" }} />
	</div>
);
const Int = (
	<div className="question__type">
		<p>Number</p>
		<Filter1Icon sx={{ color: "rgba(0,0,0,0.54)", marginLeft: "2rem" }} />
	</div>
);
const File = (
	<div className="question__type">
		<FileUploadOutlinedIcon sx={{ color: "rgba(0,0,0,0.54)", marginRight: "0.5rem" }} />
		<p>Add File</p>
	</div>
);
const Photo = (
	<div className="question__type">
		<CameraAltOutlinedIcon sx={{ color: "rgba(0,0,0,0.54)", marginRight: "0.5rem" }} />
		<p>Add Image</p>
	</div>
);
const Date = (
	<div className="question__type">
		<p>Day, month, year</p>
		<EventOutlinedIcon sx={{ color: "rgba(0,0,0,0.54)", marginLeft: "2rem" }} />
	</div>
);
const Varchar = (
	<>
		<p> Long-answer text</p>
		<div style={{ borderBottom: "1px dotted rgba(0,0,0,0.38)", height: "1px", width: "100%" }}></div>
	</>
);
