import { useState } from "react";
import { Layout } from "../components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const a = [
	{
		id: 0,
		name: "chetan0",
	},
	{
		id: 1,
		name: "chetan1",
	},
	{
		id: 2,
		name: "chetan2",
	},
	{
		id: 3,
		name: "chetan3",
	},
	{
		id: 4,
		name: "chetan4",
	},
];
const AutoAnimate = () => {
	const [parent] = useAutoAnimate<any>(/* optional config */);
	const [list, setList] = useState([...a]);
	return (
		<Layout title="Auto Animate Example">
			<h1 style={{ textAlign: "center", marginTop: 50 }}>Todo List</h1>
			<button
				style={{ margin: "30px auto", display: "block", padding: "5px 20px" }}
				onClick={() => setList((l) => [...list, { id: l.length, name: "chetan" + l.length }])}
			>
				Add
			</button>
			<ul ref={parent} style={{ width: "400px", textAlign: "center", marginInline: "auto", padding: 0 }}>
				{list.map((item) => (
					<li
						onClick={() => setList((list) => list.filter((l) => l.id !== item.id))}
						key={item.id}
						style={{
							marginBottom: 20,
							background: "#eee",
							padding: "10px",
							borderRadius: "10px",
							cursor: "pointer",
						}}
					>
						{item.name}
					</li>
				))}
			</ul>
		</Layout>
	);
};

export default AutoAnimate;
