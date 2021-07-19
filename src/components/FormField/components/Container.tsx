import React from "react";
import classnames from "classnames";
import Row, { RowProps as RawRowProps } from "../../Flexbox/Row";
import Column, { ColumnProps as RawColumnProps } from "../../Flexbox/Column";
import type { FormFieldProps } from "../shared";
// eslint-disable-next-line
import FormField from "../FormField";

interface RowProps extends RawRowProps {
  direction: "row";
}

interface ColumnProps extends RawColumnProps {
  direction: "column";
}

type WhichProps = RowProps | ColumnProps;

type Child =
  | React.ReactElement<FormFieldProps>
  | React.ReactElement<FormFieldsProps>;

type FormFieldsProps = WhichProps & {
  outerDirection?: "row" | "column";
  className?: string;
  style?: React.CSSProperties;
  children: Child | Child[];
};

function isRow(props: WhichProps): props is RowProps {
  return props.direction === "row";
}

function isColumn(props: WhichProps): props is ColumnProps {
  return props.direction === "column";
}

function isFormField(child: React.ReactNode): child is Child {
  return (
    (child as React.ReactElement).type === FormField ||
    // eslint-disable-next-line
    (child as React.ReactElement).type === FormFields
  );
}

function FormFields({
  outerDirection,
  className,
  style,
  ...props
}: FormFieldsProps) {
  const childrenArray = React.Children.toArray(
    props.children
  ) as React.ReactElement<FormFieldProps>[];

  const rowColClassName = classnames([
    `rc-formfields--${props.direction}`,
    outerDirection && `rc-formfields--${outerDirection}`,
    className,
  ]);

  const content = childrenArray.map((child) => {
    if (!isFormField(child)) {
      return child;
    }
    return React.cloneElement(child, {
      ...child.props,
      outerDirection: props.direction,
    });
  });

  if (isRow(props)) {
    return (
      <Row
        className={rowColClassName}
        style={style}
        align={props.align || "bottom left"}
      >
        {content}
      </Row>
    );
  }
  if (isColumn(props)) {
    return (
      <Column
        className={rowColClassName}
        style={style}
        align={props.align || "top left"}
      >
        {content}
      </Column>
    );
  }

  return null;
}

export default FormFields;
