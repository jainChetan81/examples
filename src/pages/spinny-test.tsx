import { useState } from "react";

const rawData: DATA = {
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
type DATA = {
	name: string;
	id: string;
	type: "folder" | "file";
	children?: DATA[];
}
function getNode(data: DATA, id: string): null | DATA {
	if (data.id === id) return data;
	if (Array.isArray(data.children) && data.children.length > 0) {
		for (const element of data.children) {
			const result = getNode(element, id);
			if (result) return result;
		}
	}
	return null;
}
function addNodeToData(data: DATA, id: string): null | DATA {
	if (data.id === id) {
		const name = `${data.name}-${data.children?.length ?? 0 + 1}`;
		const tempNode = {
			name: name,
			id: name,
			type: "file"
		} as const;
		data?.children?.push(tempNode);
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
function removeNodeFromData(data: DATA, parentId: string, childId: string): DATA | false {
	if (data.id === parentId) {
		if (!data.children) return data;
		const index = data.children?.findIndex((item) => item.id === childId);
		console.log(index, data.children, childId, parentId);
		if (index !== -1) {
			data.children?.splice(index, 1);
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
	const [pwd, setPwd] = useState<string | null>("root");
	const [data, setData] = useState<DATA>(rawData);
	const node = pwd === null ? null : getNode(data, pwd);
	function updateRoot(id: string, isFolder: boolean) {
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
	function createChild(id: string) {
		if (!id) return;
		addNodeToData(data, id);
		console.log(data);
		setData({ ...data });
	}
	function removeChild(parentId: string, childId: string) {
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
					data.children.map((child) => (
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
type Props = {
	child: DATA;
	pwd: string | null;
	updateRoot: (id: string, isFolder: boolean) => void;
	createChild: (id: string, isFolder: boolean) => void;
	removeChild: (parentId: string, childId: string) => void;
	parentId: string;
}
function RenderChild({ child, pwd, updateRoot, createChild, removeChild, parentId }: Props) {
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
