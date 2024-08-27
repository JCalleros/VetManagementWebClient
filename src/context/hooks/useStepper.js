import { useContext } from "react";
import { StepperContext } from "../stepperContext";

const useStepper = () => {
  const { validationStates, updateValidationState } =
    useContext(StepperContext);

  return { validationStates, updateValidationState };
};

export default useStepper;
