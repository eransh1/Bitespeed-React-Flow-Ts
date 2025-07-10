import styles from "./NodeCard.module.css"

const onDragStart = (event : React.DragEvent<HTMLDivElement>, nodeType : string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

type NodeCardProps = {
    nodeType : string,
    text : string,
    icon : React.ReactElement
}

const NodeCard = ({nodeType,text,icon}: NodeCardProps) => {
  return (
    <div className={styles.innerCont}>
    <div className={styles.messageOptionCont} onDragStart={(event) => onDragStart(event, nodeType)} draggable>
        {icon}
        <p>{text}</p>
    </div>
    </div>
  )
}

export default NodeCard