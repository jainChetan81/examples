import { useState } from "react";
import { Layout } from "../components";
import { ACCESS_CONTROL_USER, SAMPLE_DATA, BLOCKS_DATA, PATH_DATA } from "../types";
import dagre from "dagre";
import { useEffect, useMemo } from "react";
import { CONSTANTS, convertDataSourceToOrgChartDataSource, getNodesPath } from "../components/OrgHeirarchy/utils";
import ReactFlow, { Background, Controls, useEdgesState, useNodesState } from "react-flow-renderer";
import RoleBox from "../components/OrgHeirarchy/RoleBox";
const NODE_WIDTH = 300;
const NODE_HEIGHT = 300;

const ReactFlowExample = () => {
	// @ts-ignore
	const [users, setUsers] = useState<ACCESS_CONTROL_USER[]>([...CONSTANTS]);
	// @ts-ignore
	const orgData: SAMPLE_DATA = useMemo(() => convertDataSourceToOrgChartDataSource(users), [users]);

	const getNodesData = useMemo(
		() =>
			(data: SAMPLE_DATA[]): BLOCKS_DATA[] => {
				const localResult: BLOCKS_DATA[] = [];
				if (data.length === 0) return [];
				data.forEach((item: SAMPLE_DATA) => {
					if (item.children?.length > 0) {
						localResult.push(...getNodesData(item.children));
					}
					localResult.push({
						id: item.role_box_id,
						position: { x: 0, y: 0 },
						data: {
							label: <RoleBox user_info={item} />,
						},
					});
				});
				return localResult;
			},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[users]
	);
	const dagreGraph = new dagre.graphlib.Graph();
	dagreGraph.setDefaultEdgeLabel(() => ({}));
	const initialNodes = getNodesData([orgData]);
	const initialEdges = getNodesPath([orgData], []);

	const getLayoutedElements = (newNodes: BLOCKS_DATA[], newEdges: PATH_DATA[], direction = "TB") => {
		dagreGraph.setGraph({ rankdir: direction });

		newNodes.forEach((node) => {
			dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
		});

		newEdges.forEach((edge) => {
			dagreGraph.setEdge(edge.source, edge.target);
		});

		dagre.layout(dagreGraph);

		newNodes.forEach((node) => {
			const nodeWithPosition = dagreGraph.node(node.id);
			// @ts-ignore
			node.targetPosition = "top";
			// @ts-ignore
			node.sourcePosition = "bottom";
			node.position = {
				x: nodeWithPosition.x - NODE_WIDTH / 2,
				y: nodeWithPosition.y - NODE_HEIGHT / 2,
			};

			return node;
		});

		return { newNodes, newEdges };
	};
	const { newNodes: layoutedNodes, newEdges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
	useEffect(() => {
		setNodes(layoutedNodes);
		setEdges(layoutedEdges);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [users]);

	const [nodes, setNodes] = useNodesState(layoutedNodes);
	const [edges, setEdges] = useEdgesState(layoutedEdges);
	return (
		<Layout title="React Flow">
			<div className="datagrid-common-style access-control">
				<div className="datagrid-table">
					<ReactFlow nodes={nodes} edges={edges} fitView>
						<Controls />
						<Background color="#e5e5e5" gap={1} />
					</ReactFlow>
				</div>
			</div>
		</Layout>
	);
};

export default ReactFlowExample;
