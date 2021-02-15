import React, { ReactNode } from "react";
import styled from "@emotion/styled";

interface Props {
  children: ReactNode;
  name: string;
}

const SectionContainer = styled.div`
  &:first-child {
    border-top: 2px solid grey;
  }
`;

function Section(props: Props) {
  const childrenWithAdjustedProps = React.Children.map(
    props.children,
    (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { name: props.name });
      }
    }
  );

  return <SectionContainer>{childrenWithAdjustedProps}</SectionContainer>;
}

export default Section;
