import { useState } from "react";
import { Layout } from "../components";
import Select from "../components/ReactSelect/Select";
import Loading from "../hoc/Loading";
import type { SELECT_OPTIONS } from "../types";
const options: SELECT_OPTIONS[] = [
	{ label: "Option 1", value: 1 },
	{ label: "Option 2", value: 2 },
	{ label: "Option 3", value: 3 },
	{ label: "Option 4", value: 4 },
	{ label: "Option 5", value: 5 },
	{ label: "Option 6", value: 6 },
	{ label: "Option 7", value: 7 },
	{ label: "Option 8", value: 8 },
	{ label: "Option 9", value: 9 },
	{ label: "Option 10", value: 10 },
	{ label: "Option 11", value: 11 },
	{ label: "Option 12", value: 12 }
];
const ReactSelect = () => {
	const [singleSelectValue, setSingleSelectValue] = useState(options[0]?.value);
	const [multiSelect, setMultiSelect] = useState([options[0]!.value]);

	return (
		<Layout title="React Select">
			<section className="react_select">
				<Select<false>
					// <Select
					multiple={false}
					selected={singleSelectValue}
					options={options}
					onChange={setSingleSelectValue}
				/>
			</section>
			<section className="react_select">
				{/* <Select<false>
					multiple={true}
					selected={multiSelect}
					options={options}
					onChange={(e) => setSingleSelectValue(e)}
				/> */}
			</section>
		</Layout>
	);
};

export default Loading(ReactSelect);
