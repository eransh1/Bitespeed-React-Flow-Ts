import { useCallback, useEffect, useState, type DragEvent } from 'react'
import ReactFlow, {
    Controls,
    Background,
    addEdge,
    ReactFlowProvider,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
    type NodeChange,
    type EdgeChange,
    type Edge,
    type Node,
    type Connection,
    type ReactFlowInstance,
} from 'reactflow';
import CustomNode from '../../molecules/CustomNode/CustomNode';
import 'reactflow/dist/style.css';
import OptionSelectionBar from '../../molecules/OptionSelectionBar/OptionSelectionBar';
import { getId, returnInfoForNode, getNumberOfNodesAvailableForParticularNodeType } from "../../../utils/common"
import { useFlowContext } from '../../../context/useFlowContext';
import CustomButtonEdge from '../../molecules/Custom Button Edge/CustomButtonEdge';
import type { ConnectParams, EdgesType, NodesType, NodeType, OptionCountForIdType } from '../../../types/common.type';

const nodeTypes = {
    custom: CustomNode,
};

const edgeTypes = {
    buttonedge: CustomButtonEdge,
};


const FlowLayout = () => {
    const { nodes, setNodes, edges, setEdges, setSelectedNodes, optionCountForId, setOptionCountForId } = useFlowContext();

    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);


    useEffect(() => {
        const initialNodes = localStorage.getItem('biteSpeedInitialNodes')
        if (initialNodes) {
            setNodes(JSON.parse(initialNodes))
            setOptionCountForId((prev: OptionCountForIdType) => ({ ...prev, message: getNumberOfNodesAvailableForParticularNodeType(JSON.parse(initialNodes), 'message') }))
        }
        else {
            setNodes([{ id: '1', type: 'input', data: { label: 'Start', }, position: { x: -507, y: -249 } }])
        }
        const initialEdges = localStorage.getItem('biteSpeedInitialEdges')
        if (initialEdges) {
            setEdges(JSON.parse(initialEdges))
        }
        else {
            setEdges([])
        }

        //eslint-disable-next-line
    }, [])

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setNodes((nds: Node<any>[]) => applyNodeChanges(changes, nds));
        }, [setNodes]
    )

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds: Edge<any>[]) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const onConnect = useCallback(
        (params : ConnectParams) => {
            console.log('params::',params)
            const newEdge = {
                ...params,
                type: "buttonedge",
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: "black",
                },
            }
            setEdges((eds: EdgesType) => addEdge(newEdge as Edge | Connection, eds as Edge[]))
        },

        [setEdges],
    );

    // handle nodes position changes here
    let timeoutId : number | null = null;

    const onNodeDragStart = () => {
        return
    }
    const onNodeDragStop = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            //make api call here
        }, 500);
    };

    //On Node click
    const onNodeClick = (_, node : NodeType) => {
        setSelectedNodes(node)
    };


    //DND
    const onDragOver = useCallback((event : DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        async (event : DragEvent) => {
            event.preventDefault();
            const type = event.dataTransfer.getData("application/reactflow")

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance?.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const count = optionCountForId[type]

            setOptionCountForId((prev : OptionCountForIdType) => ({ ...prev, [type]: count + 1 }))
            const newNode = {
                id: getId(type, count),
                type: 'custom',
                position,
                data: returnInfoForNode(type, count),
            };

            setNodes((nds : NodesType) => nds.concat(newNode as NodeType));

            //eslint-disable-next-line  
        }, [reactFlowInstance, optionCountForId]
    )
    return (
        <>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onNodeDragStop={onNodeDragStop}
                    onNodeDragStart={onNodeDragStart}
                    onInit={setReactFlowInstance}
                    fitView
                    fitViewOptions={{ minZoom: 0.7, maxZoom: 1 }}
                    onDrop={onDrop}
                    onNodeClick={onNodeClick}
                    onDragOver={onDragOver}
                >
                    <Controls />
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
                <OptionSelectionBar />
            </ReactFlowProvider>
        </>
    )
}

export default FlowLayout