import { memo, type MouseEvent, useState, useMemo, useCallback } from "react";
import type { SELECT_OPTIONS } from "../../types";
type IDType = string | number;
type Props<TMulti extends boolean> = {
	options: SELECT_OPTIONS[];
	selected: TMulti extends true ? IDType[] : IDType | undefined;
	onChange: (value: TMulti extends true ? IDType[] : IDType | undefined) => void;
	multiple: boolean;
	sortOptions?: boolean;
};
const NONE_SELECTED = "Please Select A Value";
function isSelected(multi: boolean, optionValue: IDType, selectedOption: IDType | IDType[] | undefined): boolean {
	if (!multi) return optionValue === selectedOption;
	if (Array.isArray(selectedOption)) return selectedOption.includes(optionValue);
	return false;
}
function removeSelections(selected: IDType | IDType[] | undefined, multi: boolean) {
	if (!multi) return;
	if (Array.isArray(selected)) return [];
}
const sortByString = (a: string, b: string) => {
	const nameA = a.toUpperCase();
	const nameB = b.toUpperCase();
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}
	return 0;
};
function Select<TMulti extends boolean>({ options, selected, onChange, multiple, sortOptions = false }: Props<TMulti>) {
	const [show, setShow] = useState(true);
	const selectOption = useCallback(
		(option: IDType) => {
			if (!option) return;
			// in this case selected is an array, or multi is true
			if (!multiple) return onChange(option as TMulti extends true ? IDType[] : IDType | undefined);
			if (Array.isArray(selected) && multiple) {
				let tempOption: IDType[];
				if (selected?.includes(option)) {
					tempOption = selected.filter((item) => item !== option);
				} else {
					tempOption = [...(selected || []), option];
				}
				return onChange(tempOption as TMulti extends true ? IDType[] : IDType | undefined);
			}
		},
		[multiple, onChange, selected]
	);
	const valuesToShow: JSX.Element | JSX.Element[] = useMemo(() => {
		if (!selected || (Array.isArray(selected) && selected.length === 0)) return <p className="value"> {NONE_SELECTED}</p>;
		if (!multiple || typeof selected !== "object") {
			const option = options.find((option) => option.value === selected);
			return <p className="value">{option ? option.label : NONE_SELECTED}</p>;
		}
		// in this case selected is an array, or multi is true
		const buttons = selected.map((id) => {
			const label = options.find((option) => option.value === id)?.label;
			if (!label) return;
			return (
				<button
					className="option-badge"
					title={label}
					key={id}
					onClick={(e) => {
						e.stopPropagation();
						selectOption(id);
					}}>
					<span>{label}</span>
					<span className="remove-btn">&times;</span>
				</button>
			);
		});
		return <ul className="value_list">{buttons}</ul>;
	}, [multiple, options, selectOption, selected]);

	function clearSelections(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
		e.stopPropagation();
		console.log("clearing selections");
		const newSelection = removeSelections(selected, multiple) as TMulti extends true ? IDType[] : IDType | undefined;
		console.log("newSelection", newSelection);
		onChange(newSelection);
	}

	const sortedOptions = useMemo(() => {
		return sortOptions ? options.sort((a, b) => sortByString(a.label, b.label)) : options;
	}, [options, sortOptions]);

	return (
		<div className="container" role="button" tabIndex={0} onClick={() => setShow((e) => !e)} onKeyDown={() => setShow((e) => !e)}>
			{valuesToShow}
			<button className="clear-btn" onClick={clearSelections}>
				&times;
			</button>
			<div className="divider" />
			<div className={`caret ${show ? "reverse" : ""}`} />
			<ul className={`options ${show ? "show" : ""}`}>
				{sortedOptions.map((option) => (
					<li key={option.value}>
						<button
							title={option.label}
							className={`option ${isSelected(multiple, option.value, selected) ? "selected" : ""}`}
							onClick={(e) => {
								e.stopPropagation();
								selectOption(option.value);
							}}>
							<p>{option.label}</p>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default memo(Select) as typeof Select;
