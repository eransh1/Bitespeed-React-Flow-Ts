import type { Position } from "reactflow"

export type OptionCountForIdType = {
    message: number
}

export type IconDataType = {
    [key: string] :{
        icon1: React.ReactElement
        icon2: React.ReactElement
    } 
}
export type CustomNodeProps = {
    data: NodeInfoType
}

export type NodeInfoType = {
    title: string
    bgColor: string
    value: string
    type: string
    id: string
}

export type NodeType = {
    id: string,
    type: string,
    position: { x: number, y: number },
    width?: number,
    height?: number,
    selected?: boolean,
    positionAbsolute?: { x: number, y: number },
    dragging?: boolean,
    data: NodeInfoType
}

export type NodesType = NodeType[]

export type ConnectParams = {
    source: string,
    target: string,
    sourceHandle?: string | null,
    targetHandle?: string | null,
}

export type EdgeType = ConnectParams & {
    id: string,
    type: string
    markerEnd?: { type: string, color: string }
}

export type EdgesType = EdgeType[]

export type CustomButtonEdgeProps = {
    id: string,
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    sourcePosition?: Position,
    targetPosition?: Position ,
    style?: object,
    markerEnd?: string
}


