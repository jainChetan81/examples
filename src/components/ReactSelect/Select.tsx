import { memo, type MouseEvent, useState, useMemo } from "react";
import type { SELECT_OPTIONS } from "../../types";
type IDType = string | number;
type Props<TMulti extends boolean> = {
	options: SELECT_OPTIONS[];
	selected?: TMulti extends true ? IDType[] : IDType;
	onChange: (value?: TMulti extends true ? IDType[] : IDType) => void;
	multiple: boolean;
};
const NONE_SELECTED = "Please Select A Value";
function isSelected(multi: boolean, optionValue: IDType, selectedOption: IDType | IDType[] | undefined): boolean {
	if (!multi) return optionValue === selectedOption;
	if (Array.isArray(selectedOption)) return selectedOption.includes(optionValue);
	return false;
}

function Select<TMulti extends boolean>({ options, selected, onChange, multiple }: Props<TMulti>) {
	const [show, setShow] = useState(true);
	const valuesToShow: JSX.Element | JSX.Element[] = useMemo(() => {
		if (!selected || (Array.isArray(selected) && selected.length === 0)) return <>{NONE_SELECTED}</>;
		if (!multiple || typeof selected !== "object") {
			const option = options.find((option) => option.value === selected);
			return <>{option ? option.label : NONE_SELECTED}</>;
		}
		// in this case selected is an array, or multi is true
		return selected.map((v) => (
			<button
				className="option-badge"
				key={v}
				onClick={(e) => {
					e.stopPropagation();
					selectOption(v);
				}}>
				{v}
				<span className="remove-btn">&times;</span>
			</button>
		));
	}, [multiple, options, selected]);

	function selectOption(option: IDType) {
		if (!option) return;
		// in this case selected is an array, or multi is true
		if (!multiple) return onChange(option);
		if (Array.isArray(selected) && multiple) {
			let tempOption: IDType[];
			if (selected?.includes(option)) {
				tempOption = selected.filter((item) => item !== option);
			} else {
				tempOption = [...(selected || []), option];
			}
			return onChange(tempOption);
		}
	}
	function clearSelections(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
		e.stopPropagation();
		onChange();
	}

	function updateSelection(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, val: IDType) {
		e.stopPropagation();
		selectOption(val);
	}
	return (
		<div className="container" role="button" tabIndex={0} onClick={() => setShow((e) => !e)} onKeyDown={() => setShow((e) => !e)}>
			<p className="value">{valuesToShow}</p>
			<button className="clear-btn" onClick={clearSelections}>
				&times;
			</button>
			<div className="divider" />
			<div className={`caret ${show ? "reverse" : ""}`} />
			<ul className={`options ${show ? "show" : ""}`}>
				{options.map((option) => (
					<li key={option.value}>
						<button
							title={option.label}
							className={`option ${isSelected(multiple, option.value, selected) ? "selected" : ""}`}
							onClick={(e) => {
								e.stopPropagation();
								updateSelection(e, option.value);
							}}>
							{option.label}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default memo(Select) as typeof Select;
