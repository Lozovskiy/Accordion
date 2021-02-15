import React from "react";

import { PUT_SECTION } from "../../constants";

type Action = { type: string; payload: string };
interface State {
  activeSections?: string[];
  allowMultiple?: boolean;
}
type Dispatch = (action: Action) => void;
type AccordionProviderProps = { children: React.ReactNode; value: State };

const initialValue: State = {
  activeSections: undefined,
  allowMultiple: undefined,
};

const AccordionStateContext = React.createContext<State>(initialValue);
const AccordionDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function calculateActiveSections(state: State, name: string) {
  const { activeSections = [], allowMultiple } = state;
  let newActiveSections = activeSections.slice();

  const index = activeSections.findIndex((item) => item === name);
  if (index !== -1) {
    newActiveSections.splice(index, 1);
  } else if (!allowMultiple) {
    return [name];
  } else {
    newActiveSections.push(name);
  }

  return newActiveSections;
}

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case PUT_SECTION: {
      return {
        activeSections: calculateActiveSections(state, action.payload),
        allowMultiple: state.allowMultiple,
      };
    }
    default: {
      return state;
    }
  }
}

function AccordionProvider({ children, value }: AccordionProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, value);
  return (
    <AccordionStateContext.Provider value={state}>
      <AccordionDispatchContext.Provider value={dispatch}>
        {children}
      </AccordionDispatchContext.Provider>
    </AccordionStateContext.Provider>
  );
}

function useAccordionState() {
  const context = React.useContext(AccordionStateContext);
  if (context === undefined) {
    throw new Error(
      "useAccordionState must be used within a AccordionProvider"
    );
  }
  return context;
}
function useAccordionDispatch() {
  const context = React.useContext(AccordionDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useAccordionDispatch must be used within a AccordionProvider"
    );
  }
  return context;
}

export { AccordionProvider, useAccordionState, useAccordionDispatch };
