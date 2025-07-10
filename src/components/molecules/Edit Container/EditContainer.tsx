import { useEffect, useState } from 'react'
import styles from "./EditContainer.module.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useFlowContext } from '../../../context/useFlowContext';
import type { NodeInfoType, NodeType } from '../../../types/common.type';

const EditContainer = () => {
    const { nodes, setNodes, selectedNodes, setSelectedNodes } = useFlowContext();
    const [nodedata, setNodeData] = useState<NodeInfoType | null>(null)
    useEffect(() => {
        if (selectedNodes) {
            setNodeData(selectedNodes.data)
        }
    }, [selectedNodes])

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target
        setNodeData((prev) => ({ ...prev, [name]: value } as NodeInfoType))
    }

    function handleEditContainerSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const tempNewnode = nodes.map((data: NodeType) => {
            if (data.id === selectedNodes.id) {
                return { ...data, data: nodedata }
            }
            else {
                return data
            }
        })
        setNodes(tempNewnode)
        setSelectedNodes(null)
    }

    return (
        <section className={styles.outerCont}>
            <div className={styles.topContainer}>
                <IoMdArrowRoundBack onClick={() => setSelectedNodes(null)} className={styles.backIcon} />
                <p className={styles.title}>{selectedNodes?.data?.type}</p>
            </div>
            <form onSubmit={handleEditContainerSubmit} className={styles.formContainer}>
                <label className={styles.label} htmlFor="inputBoxForValue">Text</label>
                <textarea onChange={handleChange} value={nodedata?.value} className={styles.textArea} name="value" id="inputBoxForValue" rows={4} required></textarea>

                <button className={styles.saveButton}>Save</button>
            </form>
        </section>
    )
}

export default EditContainer