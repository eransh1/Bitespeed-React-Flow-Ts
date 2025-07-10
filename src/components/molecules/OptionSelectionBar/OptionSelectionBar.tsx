import styles from "./OptionSelectionBar.module.css"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import EditContainer from "../Edit Container/EditContainer";
import { useFlowContext } from "../../../context/useFlowContext";
import NodeCard from "../../atoms/NodeCard/NodeCard";

const OptionSelectionBar = () => {
    const {selectedNodes} = useFlowContext();

  return (
   <>
    <aside className={styles.outerCont}>
    {selectedNodes ? 
        <EditContainer/> : 
        <NodeCard nodeType={"message"} text={"Message"} icon={<IoChatbubbleEllipsesOutline/>} />
    }
    </aside>
   </>
  )
}

export default OptionSelectionBar