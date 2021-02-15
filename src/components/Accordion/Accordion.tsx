import React, { ReactNode } from "react";
import styled from "@emotion/styled";

import { AccordionProvider } from "./AccordionContext";
import Section from "./Section";
import Button from "./Button";
import Panel from "./Panel";

interface Props {
  defaultActiveSections?: string[];
  allowMultiple?: boolean;
  children: ReactNode;
}

const AccordionContainer = styled.div({
  position: "relative",
});

function Accordion(props: Props) {
  const { defaultActiveSections, allowMultiple } = props;
  const value = {
    activeSections: defaultActiveSections || [],
    allowMultiple: !!allowMultiple,
  };

  return (
    <AccordionProvider value={value}>
      <AccordionContainer>{props.children}</AccordionContainer>
    </AccordionProvider>
  );
}

Accordion.Section = Section;
Accordion.Button = Button;
Accordion.Panel = Panel;

export default Accordion;
