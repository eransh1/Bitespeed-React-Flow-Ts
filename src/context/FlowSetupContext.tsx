import { createContext, useState } from "react";
import { useEdgesState, useNodesState } from "reactflow";
import type { EdgesType, NodesType, NodeType, OptionCountForIdType } from "../types/common.type";

type FlowProviderProps = {
    children: React.ReactNode
}

const FlowContext = createContext({} as any);
const FlowProvider = ({ children }: FlowProviderProps) => {
    const [selectedNodes, setSelectedNodes] = useState<NodeType | null>(null)
    const [nodes, setNodes] = useNodesState<NodesType>([]);
    const [edges, setEdges] = useEdgesState<EdgesType>([]);
    const [optionCountForId, setOptionCountForId] = useState<OptionCountForIdType>({
        message: 1
    })
    return (
        <FlowContext.Provider
            value={{
                selectedNodes, setSelectedNodes,
                nodes, setNodes,
                edges, setEdges,
                optionCountForId, setOptionCountForId,
            }}
        >
            {children}
        </FlowContext.Provider>
    );
}

export { FlowContext, FlowProvider };