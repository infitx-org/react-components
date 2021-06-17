import React from "react";
import classnames from "classnames";
import Row from "components/Flexbox/Row";
import Column from "components/Flexbox/Column";
import type { FormFieldProps } from "../shared";

type FormFieldsProps = {
  outerDirection?: "row" | "column";
  direction?: "row" | "column";
  children: (
    | React.ReactElement<FormFieldProps>
    | React.ReactElement<FormFieldsProps>
  )[];
};

function FormFields({
  outerDirection,
  direction = "column",
  children,
}: FormFieldsProps) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormFieldProps>[];

  const className = classnames([
    `rc-formfields--${direction}`,
    outerDirection && `rc-formfields--${outerDirection}`,
  ]);

  const content = childrenArray.map((child) =>
    // @ts-ignore
    React.cloneElement(child, { ...child.props, outerDirection: direction })
  );

  return direction === "row" ? (
    <Row className={className} align="bottom left">
      {content}
    </Row>
  ) : (
    <Column className={className} align="top left">
      {content}
    </Column>
  );
}

export default FormFields;
