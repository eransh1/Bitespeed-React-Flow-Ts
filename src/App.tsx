import Builder from './pages/Builder/Builder';
import { FlowProvider } from './context/FlowSetupContext';
import { Flip, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Flip}
      />
      <FlowProvider>
        <Builder />
      </FlowProvider>
    </>
  )
}

export default App