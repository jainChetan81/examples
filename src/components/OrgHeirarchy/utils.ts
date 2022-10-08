import _cloneDeep from "lodash/cloneDeep";
import { ACCESS_CONTROL_USER, SAMPLE_DATA, PATH_DATA } from "../../types";
export const convertDataSourceToOrgChartDataSource = function (dataSource: ACCESS_CONTROL_USER[]) {
	if (Object.keys(dataSource).length === 0) return {};
	const clonedDataSource = _cloneDeep(dataSource);
	const rootNode = findRootNode(clonedDataSource);
	if (!rootNode) {
		return {};
	}
	rootNode.adminID = rootNode.id;
	rootNode.role_box_id = "admin_" + rootNode.id;
	const orgChartDataSource: SAMPLE_DATA = { ...rootNode };

	const queue: SAMPLE_DATA[] = [];
	queue.push(orgChartDataSource);
	while (queue.length !== 0) {
		const currentNode = queue.pop();
		// @ts-ignore
		const children = findChildren(currentNode.adminID, clonedDataSource).map((child) => {
			child.adminID = child.id;
			child.role_box_id = "admin_" + child.id;
			return child;
		});
		if (currentNode) currentNode.children = children;
		queue.push(...children);
	}

	return orgChartDataSource;
};

export const convertOrgChartDataSourceToDataSource = function (orgChartDataSource: any) {
	const newOrgChartDataSource = _cloneDeep(orgChartDataSource);
	const dataSource: any = [];

	dfs(newOrgChartDataSource, null, dataSource);
	return dataSource;
};

const findRootNode = function (dataSource: any) {
	for (const key in dataSource) {
		const currentNode = dataSource[key];
		if (currentNode.parentId === null) {
			return currentNode;
		}
	}
	return null;
};
const dfs = function (ds: any, parentID: any, result: any) {
	const { firstname, lastname, adminID, phoneNumber, title, email } = ds;

	const admin: any = { firstname, lastname, adminID, phoneNumber, email, title, parentId: parentID };
	if (ds.deleted) {
		admin.deleted = true;
	} else if (ds.new) {
		admin.new = true;
	} else if (ds.parentId !== parentID || ds.updated) {
		admin.updated = true;
	}
	result.push(admin);
	if (ds.children && Array.isArray(ds.children)) {
		for (const child of ds.children) {
			dfs(child, ds.adminID, result);
		}
	}

	return;
};
const findChildren = function (id: string, dataSource: any) {
	if (typeof dataSource !== "object") throw new Error(`Invalid dataSource. DataSource must be of type object`);

	const children = [];
	for (const key in dataSource) {
		const currentNode = dataSource[key];
		if (currentNode.parentId === id) {
			children.push(currentNode);
		}
	}

	return children;
};
export const getNodesPath = (data: SAMPLE_DATA[], result: PATH_DATA[]): PATH_DATA[] => {
	if (data.length === 0) return [];
	for (const element of data) {
		if (element.children?.length > 0) {
			for (let j = 0; j < element.children?.length; j++) {
				result.push({
					id: `e${element.role_box_id}-${element.children[j].role_box_id}`,
					source: element.role_box_id,
					target: element.children[j].role_box_id,
					type: "smoothstep",
				});
			}
			getNodesPath(element.children, result);
		}
	}
	return result;
};
export const findAvatarInitials = (name: string): string => {
	const avatar = name.toLocaleUpperCase().split(" ");
	const name1 = avatar.length > 0 ? avatar[0].charAt(0) : "";
	const name2 = avatar.length > 1 ? avatar[1].charAt(0) : "";
	return name1 + name2;
};

export const CONSTANTS = [
	{
		id: 4274,
		email: "sid@unolo.com",
		firstname: "Siddharth",
		lastname: "Kilam",
		phoneNumber: "+919599936990",
		parentId: null,
		title: "Managing Director",
		roleID: "a040a77a-9321-465f-947a-cbb0c7c39c1c",
		execVisibility: -1,
	},
	{
		id: 5070,
		email: "jaydev1@unolo.com",
		firstname: "Jaydev",
		lastname: "2V1",
		phoneNumber: "9560984090",
		parentId: 4274,
		title: "PM",
		roleID: "47e301f2-9f8d-4432-975b-74fa6188f5bf",
		execVisibility: 5070,
	},
	{
		id: 4748,
		email: "bqdqjbjqb@gmail.com",
		firstname: "Phil",
		lastname: "J",
		phoneNumber: "15164610",
		parentId: 5070,
		title: "Asst. Manager",
		roleID: "47e301f2-9f8d-4432-975b-74fa6188f5bf",
		execVisibility: 4748,
	},
	{
		id: 4429,
		email: "Level1first@gmail.com",
		firstname: "Manoj",
		lastname: "Kapoor",
		phoneNumber: "9549497979",
		parentId: 5070,
		title: "Area Head",
		roleID: "47e301f2-9f8d-4432-975b-74fa6188f5bf",
		execVisibility: 4429,
	},
	{
		id: 8601,
		email: "joyin85314@hax55.com",
		firstname: "test",
		lastname: "tessachin",
		phoneNumber: "9898989888",
		parentId: 4429,
		title: "abc",
		roleID: "47e301f2-9f8d-4432-975b-74fa6188f5bf",
		execVisibility: 8601,
	},
	{
		id: 4431,
		email: "ss@ss.com",
		firstname: "Pooja",
		lastname: "Jf",
		phoneNumber: "9560984090",
		parentId: 5070,
		title: "level2 first",
		roleID: "47e301f2-9f8d-4432-975b-74fa6188f5bf",
		execVisibility: 4431,
	},
	{
		id: 4432,
		email: "pbora@proteonpharma.co",
		firstname: "Kishore",
		lastname: "Salvi2",
		phoneNumber: "9560984090",
		parentId: 4431,
		title: "Manager",
		roleID: "1132d874-753f-407b-8feb-672e4d23c6dc",
		execVisibility: 4432,
	},
	{
		id: 8458,
		email: "sachin@unolo.com",
		firstname: "sachin",
		lastname: "sahrma",
		phoneNumber: "+91212121212",
		parentId: 4274,
		title: "test",
		roleID: "47e301f2-9f8d-4432-975b-74fa6188f5bf",
		execVisibility: 8458,
	},
	{
		id: 12114,
		email: "tuhin@unolo.com",
		firstname: "Tuhin",
		lastname: "ROy",
		phoneNumber: "9897264455",
		parentId: 8458,
		title: "",
		roleID: "47e301f2-9f8d-4432-975b-74fa6188f5bf",
		execVisibility: 12114,
	},
	{
		id: 6949,
		email: "shashankjaiswal095@gmail.com",
		firstname: "Shashank",
		lastname: "Jaiswal",
		phoneNumber: "9560552769",
		parentId: 4274,
		title: "Manager",
		roleID: "47e301f2-9f8d-4432-975b-74fa6188f5bf",
		execVisibility: -1,
	},
	{
		id: 11898,
		email: "abc@testabc.com",
		firstname: "test",
		lastname: "test",
		phoneNumber: "8580908765",
		parentId: 6949,
		title: "",
		roleID: "47e301f2-9f8d-4432-975b-74fa6188f5bf",
		execVisibility: 11898,
	},
	{
		id: 9612,
		email: "t@c",
		firstname: "Test2",
		lastname: "Test2",
		phoneNumber: "7887898989",
		parentId: 6949,
		title: "",
		roleID: "47e301f2-9f8d-4432-975b-74fa6188f5bf",
		execVisibility: 9612,
	},
	{
		id: 9619,
		email: "t@c.co",
		firstname: "Working",
		lastname: "Admin",
		phoneNumber: "7887876766",
		parentId: 9612,
		title: "",
		roleID: "47e301f2-9f8d-4432-975b-74fa6188f5bf",
		execVisibility: 9619,
	},
	{
		id: 13773,
		email: "shubhamkumar9297@gmail.com",
		firstname: "Shubham",
		lastname: "Kumar",
		phoneNumber: "9069677464",
		parentId: 4274,
		title: "Manager",
		roleID: "1132d874-753f-407b-8feb-672e4d23c6dc",
		execVisibility: 13773,
	},
];
