import React from "react";
import classnames from "classnames";
import Tooltip from "components/Tooltip";
import Row from "components/Flexbox/Row";
import Icon from "components/Icon";
import { ValidationMessage } from "@modusbox/ts-utils/lib/validation";
import "./ValidationCard.scss";

const XSvgIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M13.289 3.418c-.218-.252-.455-.489-.707-.707L8 7.293 3.418 2.711c-.252.218-.489.455-.707.707L7.293 8l-4.582 4.582c.218.252.455.489.707.707L8 8.707l4.582 4.582c.252-.218.489-.455.707-.707L8.707 8l4.582-4.582z" />
  </svg>
);

const VSvgIcon = (
  <svg viewBox="0 0 16 16">
    <path d="M11.605 3.086L6.898 9.803 4.311 7.991 3.164 9.629l4.225 2.959 5.657-8.073c-.396-.554-.884-1.037-1.441-1.429z" />
  </svg>
);

const ActiveValidationIcon = (
  <Icon className="validation__message__icon" icon={XSvgIcon} size={12} />
);

const InactiveValidationIcon = (
  <Icon className="validation__message__icon" icon={VSvgIcon} size={14} />
);

const UnsetValidationIcon = (
  <div className="validation__message__icon--unset" />
);

interface ValidationIconProps {
  active?: boolean;
}

const ValidationIcon = ({ active }: ValidationIconProps) => {
  if (active === true) {
    return ActiveValidationIcon;
  }
  if (active === false) {
    return InactiveValidationIcon;
  }
  return UnsetValidationIcon;
};

interface ValidationMessageProps {
  message: string;
  active?: boolean;
}
const ValidationMessageRow = ({ message, active }: ValidationMessageProps) => {
  const className = classnames([
    "validation__message",
    active && "validation__message--active",
    active === false && "validation__message--inactive",
  ]);
  return (
    <Row>
      <li className={className}>
        <div className="validation__message__icon-container">
          <ValidationIcon active={active} />
        </div>
        <span className="validation__message__text">{message}</span>
      </li>
    </Row>
  );
};

function ValidationCard({
  validation = [],
}: {
  validation: ValidationMessage[];
}) {
  return (
    <div>
      <ul className="validation__messages">
        {validation.map(({ message, active }, i) => (
          <ValidationMessageRow
            key={i.toString()}
            message={message}
            active={active}
          />
        ))}
      </ul>
    </div>
  );
}

export interface WithValidationProps {
  focused?: boolean;
  validation?: ValidationMessage[];
}

export default function withValidation<Props>(
  Component: React.ComponentType<Props>
) {
  return React.forwardRef(function WithValidation(
    props: Props & WithValidationProps,
    ref
  ) {
    const component = <Component {...(props as Props)} ref={ref} />;
    return (
      <Tooltip
        fixed={!!props.focused && !!props.validation}
        content={
          <ValidationCard
            validation={props.validation as ValidationMessage[]}
          />
        }
        position="right"
      >
        {component}
      </Tooltip>
    );
  });
}
