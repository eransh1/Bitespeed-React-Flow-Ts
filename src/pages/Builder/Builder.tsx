import styles from "./Builder.module.css"
import Navbar from '../../components/atoms/Navbar/Navbar'
import FlowLayout from "../../components/organisms/FlowLayout/FlowLayout"

const Builder = () => {

  return (
    <>
    <Navbar/>
    <section style={{ width: '100%', height: '90vh' }} className={styles.outerCont}>
    <FlowLayout/>
    </section>
    </>
  )
}

export default Builder