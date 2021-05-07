import React from "react";
import classnames from "classnames";
import { Kind } from "../types";

export interface FieldPublicProps {
  kind: `${Kind}`;
  label?: string;
}

interface FieldPrivateProps {
  focused: boolean;
  children: React.ReactNode;
}

type FieldProps = FieldPublicProps & FieldPrivateProps;

export default function Field({
  kind,
  label,
  focused,
  children,
}: FieldProps): JSX.Element {
  const fieldClassname = classnames([
    "field",
    kind && `field--${kind}`,
    focused && "field--focused",
  ]);
  return (
    <div className={fieldClassname}>
      <label>{label}</label>
      {children}
    </div>
  );
}
