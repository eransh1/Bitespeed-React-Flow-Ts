import styles from "./Navbar.module.css"
import { useFlowContext } from '../../../context/useFlowContext';
import { toast } from 'react-toastify';


const Navbar = () => {
  const { nodes, edges } = useFlowContext();

  function handleSaveBtnClick() {
    if (nodes.length < 2) {
      toast.error("Create atleast 1 node")
      return
    }
    if ((nodes.length - 1) !== edges.length) {
      toast.error("Make the required connections")
      return
    }
    localStorage.setItem('biteSpeedInitialNodes', JSON.stringify(nodes))
    localStorage.setItem('biteSpeedInitialEdges', JSON.stringify(edges))
    toast.success("Successfully saved")
  }

  return (
    <nav className={styles.navbar}>
      <button onClick={handleSaveBtnClick} className={styles.saveButton}>Save changes</button>
    </nav>
  )
}

export default Navbar