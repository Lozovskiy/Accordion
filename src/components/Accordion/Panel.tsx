import React, { ReactNode, useState, useCallback } from "react";
import styled from "@emotion/styled";

import { useAccordionState } from "./AccordionContext";

interface Props {
  children: ReactNode;
  name?: string;
}

interface ConatinerProps {
  active: boolean;
  maxHeight?: number;
}

const PanelContainer = styled.div<ConatinerProps>`
  max-height: ${(props) => {
    // console.log(props.active, props.maxHeight);
    return props.active ? props.maxHeight + "px" : "0";
  }};
  overflow: hidden;
  transition: max-height 0.3s;
  box-sizing: border-box;
`;

const PanelWrapper = styled.div`
  padding: 10px 0;
  border-bottom: 2px solid grey;
`;

function Panel(props: Props) {
  const [textWrapperRef, setRef] = useState(null);
  const onRefChange = useCallback((node) => {
    if (node) {
      setRef(node);
    }
  }, []);
  const accordionData = useAccordionState();
  const active = !!accordionData.activeSections?.find(
    (item) => props.name === item
  );

  const maxHeight = (textWrapperRef as null | HTMLDivElement)?.getBoundingClientRect()
    .height;

  return (
    <PanelContainer active={active} maxHeight={maxHeight}>
      <PanelWrapper ref={onRefChange}>{props.children}</PanelWrapper>
    </PanelContainer>
  );
}

export default Panel;
