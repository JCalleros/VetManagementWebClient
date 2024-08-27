"use client";

import { createContext, useState } from "react";

const StepperContext = createContext();

const StepperProvider = ({ children }) => {
  const [validationStates, setValidationStates] = useState({});

  const updateValidationState = (stepIndex, isValid) => {
    setValidationStates((prevState) => ({
      ...prevState,
      [stepIndex]: isValid,
    }));
  };

  return (
    <StepperContext.Provider
      value={{ validationStates, updateValidationState }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export { StepperProvider, StepperContext };
