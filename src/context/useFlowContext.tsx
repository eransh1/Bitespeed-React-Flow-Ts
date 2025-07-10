import { useContext } from "react";
import { FlowContext } from "./FlowSetupContext";

const useFlowContext = () => {
  return useContext(FlowContext);
};

export { useFlowContext };