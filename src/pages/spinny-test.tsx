import React from "react";

const rawData = {
	name: "root",
	id: "root",
	type: "folder",
	children: [
		{
			name: "child1",
			id: "child1",
			type: "file"
		},
		{
			name: "child2",
			id: "child2",
			type: "folder",
			children: [
				{
					name: "child1-1",
					id: "child1-1",
					type: "folder",
					children: [
						{
							name: "child1-1-1",
							id: "child1-1-1",
							type: "file"
						}
					]
				}
			]
		},
		{
			name: "child3",
			id: "child3",
			type: "file"
		}
	]
};
function getNode(data, id) {
	if (data.id === id) return data;
	if (Array.isArray(data.children) && data.children.length > 0) {
		for (const element of data.children) {
			const result = getNode(element, id);
			if (result) return result;
		}
	}
	return null;
}
function addNodeToData(data, id) {
	if (data.id === id) {
		const name = `${data.name}-${data.children?.length ?? 0 + 1}`;
		const tempNode = {
			name: name,
			id: name,
			type: "file"
		};
		data.children.push(tempNode);
		return data;
	}
	if (Array.isArray(data.children) && data.children.length > 0) {
		for (const element of data.children) {
			const result = addNodeToData(element, id);
			if (result) return result;
		}
	}
	return null;
}
// create a function to remove the node based on its id
function removeNodeFromData(data, parentId, childId) {
	if (data.id === parentId) {
		const index = data.children.findIndex((item) => item.id === childId);
		console.log(index, data.children, childId, parentId);
		if (index !== -1) {
			data.children.splice(index, 1);
		}
		return data;
	}
	if (Array.isArray(data.children) && data.children.length > 0) {
		for (const element of data.children) {
			const result = removeNodeFromData(element, parentId, childId);
			if (result) return result;
		}
	}
	return false;
}
export default function App() {
	const [pwd, setPwd] = React.useState("root");
	const [data, setData] = React.useState(rawData);
	const node = pwd === null ? null : getNode(data, pwd);
	function updateRoot(id, isFolder) {
		console.log(pwd, id);
		if (id === pwd) {
			setPwd(null);
			return;
		}
		if (!isFolder) {
			console.log("wrong");
			return;
		}
		setPwd(id);
	}
	function createChild(id) {
		if (!id) return;
		addNodeToData(data, id);
		console.log(data);
		setData({ ...data });
	}
	function removeChild(parentId, childId) {
		console.log(parentId, childId);
		if (!parentId || !childId) return;
		removeNodeFromData(data, parentId, childId);
		console.log(data);
		setData({ ...data });
	}
	console.log(pwd);
	// if (!node) return <>Loading...</>;
	return (
		<div className="App">
			<h1>name: {node?.name}</h1>
			<h2></h2>
			<ul>
				{Array.isArray(data.children) &&
					data.children.map((child, i) => (
						<RenderChild
							key={child.id}
							child={child}
							pwd={pwd}
							updateRoot={updateRoot}
							createChild={createChild}
							removeChild={removeChild}
							parentId={data.id}
						/>
					))}
			</ul>
		</div>
	);
}

function RenderChild({ child, pwd, updateRoot, createChild, removeChild, parentId }) {
	const node = pwd === null ? null : getNode(child, pwd);
	console.log(node);
	return (
		<li>
			<button onClick={() => updateRoot(child.id, child.type === "folder")}>{child.name}</button>
			{child.type === "folder" && <button onClick={() => createChild(child.id, child.type === "folder")}>Add</button>}
			<button onClick={() => removeChild(parentId, child.id)}>Remove</button>
			{(pwd === child.id || node !== null) && (
				<ul>
					{Array.isArray(child.children) &&
						child.children.map((item) => (
							<RenderChild
								key={child.id}
								child={item}
								pwd={pwd}
								updateRoot={updateRoot}
								createChild={createChild}
								removeChild={removeChild}
								parentId={child.id}
							/>
						))}
				</ul>
			)}
		</li>
	);
}
