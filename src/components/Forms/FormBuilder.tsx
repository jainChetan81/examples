import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import { Tooltip } from "@mui/material";
import _cloneDeep from "lodash/cloneDeep";
import _orderBy from "lodash/orderBy";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FORM_QUESTION_TYPE, FORM_SECTION_TYPE, FORM_TEMPLATE_TYPE } from "../../types";
import FormQuestions from "./FormQuestions";
import FormSectionHeader from "./FormSectionHeader";
import { updateFormSection, updateFormTemplate } from "./FormUtils";
type Props = {
	formTemplate: FORM_TEMPLATE_TYPE;
	setFormTemplate: Dispatch<SetStateAction<FORM_TEMPLATE_TYPE>>;
};
const FormBuilder: FC<Props> = ({ formTemplate, setFormTemplate }) => {
	const [currentElementId, setCurrentElementId] = useState<string | null>(
		formTemplate.formSections[0].formSectionID || null
	);
	const dragCurrentItem = useRef<{
		questionIndex: number | null;
		sectionIndex: number | null;
	}>({
		questionIndex: null,
		sectionIndex: null,
	});
	const dragOverItem = useRef<{
		questionIndex: number | null;
		sectionIndex: number | null;
	}>({
		questionIndex: null,
		sectionIndex: null,
	});
	const currentSectionId = useRef<number>(0);

	const dragStart = (position: number, currentSIdx: number) => {
		if (dragCurrentItem.current?.questionIndex === null || isNaN(dragCurrentItem.current?.questionIndex!))
			dragCurrentItem.current = {
				questionIndex: position,
				sectionIndex: currentSIdx,
			};
	};

	const dragEnter = (position: number, currentSIdx: number) => {
		dragOverItem.current = {
			questionIndex: position,
			sectionIndex: currentSIdx,
		};
	};

	const drop = (sIdx: number) => {
		if (
			dragCurrentItem.current === null ||
			dragCurrentItem.current.questionIndex === null ||
			dragCurrentItem.current.sectionIndex === null ||
			dragOverItem.current === null ||
			dragOverItem.current.questionIndex === null ||
			dragOverItem.current.sectionIndex === null ||
			(dragCurrentItem.current.questionIndex === dragOverItem.current.questionIndex &&
				dragCurrentItem.current.sectionIndex === dragOverItem.current.sectionIndex)
		) {
			dragCurrentItem.current.questionIndex = null;
			dragOverItem.current.questionIndex = null;
			return;
		}
		const { tempFormTemplate } = updateFormSection(formTemplate, sIdx);
		const toMoveQuestion = _cloneDeep(
			tempFormTemplate.formSections[dragCurrentItem.current.sectionIndex].formQuestions[
				dragCurrentItem.current.questionIndex
			]
		);
		tempFormTemplate.formSections[dragCurrentItem.current.sectionIndex].formQuestions.splice(
			dragCurrentItem.current.questionIndex,
			1
		);
		tempFormTemplate.formSections[dragOverItem.current.sectionIndex].formQuestions.splice(
			dragOverItem.current.questionIndex,
			0,
			toMoveQuestion
		);
		tempFormTemplate.formSections[dragCurrentItem.current.sectionIndex].formQuestions.forEach((question, index) => {
			question.sequence = index;
		});
		tempFormTemplate.formSections[dragOverItem.current.sectionIndex].formQuestions.forEach((question, index) => {
			question.sequence = index;
		});
		dragCurrentItem.current = {
			questionIndex: null,
			sectionIndex: null,
		};
		dragOverItem.current = {
			questionIndex: null,
			sectionIndex: null,
		};
		setFormTemplate(tempFormTemplate);
	};

	const addNewQuestion = () => {
		const { tempFormTemplate, time } = updateFormTemplate(formTemplate);

		const tempQuestions = _cloneDeep(tempFormTemplate.formSections[currentSectionId.current].formQuestions);
		const newQuestion: FORM_QUESTION_TYPE = {
			questionID: uuidv4(),
			questionType: "varchar",
			createdTs: time,
			lastModifiedTs: time,
			options: [
				{
					correct: null,
					optionValue: "",
					createdTs: time,
					lastModifiedTs: time,
					nextSection: null,
				},
			],
			question: "",
			required: false,
			score: 12,
			sequence: tempQuestions.length + 1,
		};
		tempQuestions.push(newQuestion);
		tempQuestions.forEach((question, index) => {
			question.sequence = index;
		});
		tempFormTemplate.formSections[currentSectionId.current].formQuestions = tempQuestions;
		setFormTemplate(tempFormTemplate);
	};

	const addNewSection = () => {
		const { tempFormTemplate, time } = updateFormTemplate(formTemplate);
		const tempSections = _cloneDeep(tempFormTemplate.formSections);
		const lastSectionIndex = tempSections.length - 1;
		const newSection: FORM_SECTION_TYPE = {
			formSectionID: uuidv4(),
			sectionTitle: "",
			sectionDescription: "",
			formQuestions: [],
			createdTs: time,
			lastModifiedTs: time,
			seqNumber: tempSections.length + 1,
			nextSection: "TERMINATE",
		};
		tempSections.push(newSection);
		// fix sequence number after new section is added
		tempSections.forEach((section, idx) => ({ ...section, seqNumber: idx }));
		// change nextSection value to the new section id
		tempSections[lastSectionIndex].nextSection = newSection.formSectionID;
		tempFormTemplate.formSections = tempSections;
		setFormTemplate(tempFormTemplate);
	};

	const handleJumpToNextSection = (sectionId: string, currentSectionIndex: number) => {
		if (!sectionId || sectionId.length === 0) return;
		const { tempFormTemplate } = updateFormSection(formTemplate, currentSectionIndex);
		tempFormTemplate.formSections[currentSectionIndex].nextSection = sectionId;
		setFormTemplate(tempFormTemplate);
	};

	// * to move sidebar with clicking on different sections and questions
	useEffect(() => {
		const movingMenu = document.querySelector("[data-id='moving-menu']")! as HTMLElement;
		const activeElement = document.querySelector("[data-id='form-builder'] .active") as HTMLElement;
		const formBuilder = document.querySelector("[data-id='form-builder']")?.getBoundingClientRect()!;
		if (currentElementId === null || activeElement === null || movingMenu === null) return;
		const activeElementBounds = activeElement.getBoundingClientRect();
		// relative distance between parent( class"formBuilder") and activeElement(class="active")
		const heightBetweenElements = activeElementBounds.top - formBuilder.top;
		// distance between activeElement.top and movingMenu.top to keep it in between
		const heightBetweenMovingMenu = activeElementBounds.height - movingMenu.getBoundingClientRect().height;
		movingMenu.style.top = `${heightBetweenElements + heightBetweenMovingMenu / 2}px`;
	}, [currentElementId]);

	return (
		<div className="form_builder" data-id="form-builder">
			<div>
				{Array.isArray(formTemplate.formSections) &&
					formTemplate.formSections.length > 0 &&
					_orderBy(formTemplate.formSections, ["seqNumber"], ["asc"]).map((formSection, sectionIndex) => (
						<>
							<div
								role="button"
								key={formSection.formSectionID + "-" + sectionIndex}
								tabIndex={sectionIndex}
								className={`form_builder-section ${currentElementId === formSection.formSectionID ? "active" : ""}`}
								onMouseDown={() => {
									currentSectionId.current = sectionIndex;
									setCurrentElementId(formSection.formSectionID);
								}}
							>
								<FormSectionHeader
									id={formSection.formSectionID}
									sectionTitle={formSection.sectionTitle}
									sectionDescription={formSection.sectionDescription || ""}
									length={formTemplate.formSections.length}
									index={sectionIndex}
									currentElementId={currentElementId}
									setFormTemplate={setFormTemplate}
									formTemplate={formTemplate}
								/>
							</div>
							{Array.isArray(formSection.formQuestions) &&
								formSection.formQuestions.length > 0 &&
								_orderBy(formSection.formQuestions, ["sequence"], ["asc"]).map((formQuestion, questionIndex) => (
									<div
										role="button"
										tabIndex={questionIndex}
										className={`form_builder-question ${currentElementId === formQuestion.questionID ? "active" : ""}`}
										key={formQuestion.questionID + "-" + questionIndex}
										onMouseDown={() => {
											currentSectionId.current = sectionIndex;
											setCurrentElementId(formQuestion.questionID);
										}}
										draggable
										onDragStart={() => dragStart(questionIndex, sectionIndex)}
										onDragEnter={() => dragEnter(questionIndex, sectionIndex)}
										onDragEnd={() => drop(sectionIndex)}
									>
										<FormQuestions
											length={formSection.formQuestions.length}
											index={questionIndex}
											id={formQuestion.questionID}
											formSectionIndex={sectionIndex}
											question={formQuestion}
											currentElementId={currentElementId}
											setFormTemplate={setFormTemplate}
											formTemplate={formTemplate}
										/>
									</div>
								))}
							{sectionIndex < formTemplate.formSections.length - 1 && (
								<div className="section_footer">
									After Section {sectionIndex + 1}
									<select
										value={formSection.nextSection || ""}
										onChange={(e) => handleJumpToNextSection(e.target.value, sectionIndex)}
									>
										<option value="">Select a Value</option>
										{formTemplate.formSections.map((section, index) => {
											if (sectionIndex >= index) return null;
											return (
												<option key={section.formSectionID + "-" + index} value={section.formSectionID}>
													Jump to Section {index + 1} ({section.sectionTitle})
												</option>
											);
										})}
										<option value="TERMINATE">Submit Form</option>
									</select>
								</div>
							)}
						</>
					))}
			</div>
			<div className="movingMenu" data-id="moving-menu">
				<Tooltip placement="right-end" title="Add Question">
					<button type="button" onClick={addNewQuestion}>
						<AddCircleOutlineIcon sx={{ color: "#5f6368" }} />
					</button>
				</Tooltip>
				<Tooltip placement="right-end" title="Add Section">
					<button type="button" onClick={addNewSection}>
						<SplitscreenIcon sx={{ color: "#5f6368" }} />
					</button>
				</Tooltip>
			</div>
		</div>
	);
};

export default FormBuilder;
