import React, { ReactNode } from "react";
import styled from "@emotion/styled";

import { useAccordionDispatch, useAccordionState } from "./AccordionContext";
import { PUT_SECTION } from "../../constants";
import arrow from "../../static/img/arrow.svg";

interface Props {
  children: ReactNode;
  name?: string;
}

interface ImageProps {
  active: boolean;
}

const ButtonContainer = styled.div`
  border-bottom: 2px solid grey;
  border-radius: 3px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Arrow = styled.img<ImageProps>`
  width: 30px;
  height: 30px;
  user-select: none;
  transform: rotate(${(props) => (props.active ? "90deg" : "0deg")});
  transition: 0.3s ease;
`;

function Button(props: Props) {
  const accordionData = useAccordionState();
  const setAccordionData = useAccordionDispatch();
  const handleButtonClick = () =>
    setAccordionData({ type: PUT_SECTION, payload: props.name! });

  const active = !!accordionData.activeSections?.find(
    (item) => props.name === item
  );

  return (
    <ButtonContainer onClick={handleButtonClick}>
      {props.children}
      <Arrow active={active} src={arrow} />
    </ButtonContainer>
  );
}

export default Button;
