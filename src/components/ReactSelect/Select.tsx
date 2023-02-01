import { memo, useState } from "react";
import type { SELECT_OPTIONS } from "../../types";
type IDType = string | number;
type Props<TMulti, TTypeId> = {
	options: SELECT_OPTIONS[];
	selected?: TMulti extends true ? TTypeId[] : TTypeId;
	onChange: (value?: TMulti extends true ? TTypeId[] : TTypeId) => void;
	multiple: boolean;
};

function isSelected(option: SELECT_OPTIONS, value: SELECT_OPTIONS[] | undefined): boolean {
	return value?.some((item) => item.value === option.value) ?? false;
}

function Select<TMulti, TTypeId extends IDType>({ options, selected, onChange, multiple }: Props<TMulti, TTypeId>) {
	const [show, setShow] = useState(false);
	const valuesToShow = selected
		? Array.isArray(selected)
			? selected?.map((v) => (
					<button
						className="option-badge"
						key={v}
						onClick={(e) => {
							e.stopPropagation();
							onChange(selected?.filter((item) => item.value !== v.value));
						}}
					>
						{v.label}
						<span className="remove-btn">&times;</span>
					</button>
			  ))
			: selected.label
		: "";

	function selectOption(option: SELECT_OPTIONS) {
		if (!option) return;
		if (!selected) {
			multiple ? onChange([option]) : onChange(option);
			return;
		}
		if (!multiple) {
			onChange(option);
			return;
		}
		const index = selected.findIndex((v) => v.value === option.value);
		if (index === -1) {
			onChange([...selected, option]);
			return;
		}
		selected.splice(index, 1);
		onChange(selected);
	}
	return (
		<div
			className="container"
			role="button"
			tabIndex={0}
			onClick={() => setShow((e) => !e)}
			onKeyDown={() => setShow((e) => !e)}
			onBlur={() => setShow(false)}
		>
			<p className="value">{valuesToShow ? <>{valuesToShow}</> : <span>Select A Value</span>}</p>
			<button
				className="clear-btn"
				onClick={(e) => {
					e.stopPropagation();
					onChange();
				}}
			>
				&times;
			</button>
			<div className="divider" />
			<div className="caret" />
			<ul className={`options ${show ? "show" : ""}`}>
				{options.map((option) => (
					<li
						className={`option ${
							// @ts-expect-error sdsds
							multiple ? isSelected(option, selected) : option.value === selected?.value ? "selected" : ""
						}`}
						key={option.value}
						onClick={(e) => {
							e.stopPropagation();
							selectOption(option);
						}}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
}

export default memo(Select) as typeof Select;
