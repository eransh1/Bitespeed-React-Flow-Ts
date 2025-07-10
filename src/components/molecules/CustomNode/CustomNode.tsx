import { memo } from 'react'
import { Handle, Position } from 'reactflow';
import styles from "./CustomNode.module.css"
import { useFlowContext } from '../../../context/useFlowContext';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoLogoWhatsapp } from "react-icons/io";
import type { CustomNodeProps, IconDataType } from '../../../types/common.type';

const iconData : IconDataType = {
    message: {
        icon1: <IoChatbubbleEllipsesOutline />,
        icon2: <IoLogoWhatsapp />
    }
}

const CustomNode = ({ data }: CustomNodeProps) => {
    const { selectedNodes } = useFlowContext();
    return (
        <>
            <div style={{ border: selectedNodes?.id === data?.id ? '2px solid black' : '' }} className={styles.customNodeOuterCont}>
                <div style={{ backgroundColor: data?.bgColor }} className={styles.topCont}>
                    <span className={styles.icon1}>{iconData[data?.type]?.icon1}</span>
                    <p className={styles.title}>{data?.title}</p>
                    <span className={styles.icon2}>{iconData[data?.type]?.icon2}</span>
                </div>
                <div className={styles.bottomCont}>
                    <p className={styles.value}>{data?.value}</p>
                </div>
                <Handle type="target" position={Position.Left} style={{ width: "10px", height: "10px" }} />
                <Handle type="source" position={Position.Right} style={{ width: "10px", height: "10px" }} />
            </div>
        </>
    )
}

export default memo(CustomNode);