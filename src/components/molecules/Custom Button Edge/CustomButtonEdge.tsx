import { useState } from 'react'
import { getBezierPath } from 'reactflow';
import { useFlowContext } from '../../../context/useFlowContext';
import { TiMinus } from 'react-icons/ti';
import FormSubmitLoading from '../../atoms/FormSubmitLoading/FormSubmitLoading';
import styles from "./CustomButtonEdge.module.css"
import type { CustomButtonEdgeProps, EdgesType } from '../../../types/common.type';

const foreignObjectSize = 40;
const CustomButtonEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: CustomButtonEdgeProps) => {

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const [loading, setLoading] = useState(false);
    //eslint-disable-next-line
    const { setEdges } = useFlowContext()

    const onEdgeClick = (evt: React.MouseEvent<HTMLButtonElement>, id: string) => {
        evt.stopPropagation();
        setLoading(true)
        setEdges((edges: EdgesType) => edges.filter((edge) => edge.id !== id));
    }

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={labelX - foreignObjectSize / 2}
                y={labelY - foreignObjectSize / 2}
                className={styles.edgebutton_foreignobject}
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div>
                    <button className={styles.edgebutton} onClick={(event) => onEdgeClick(event, id)}>
                        {loading ? <FormSubmitLoading width={"10px"} height={"10px"} /> : <TiMinus />}
                    </button>
                </div>
            </foreignObject>
        </>
    )
}

export default CustomButtonEdge