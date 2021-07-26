import classnames from "classnames";
import Row from "components/Flexbox/Row";
import Icon from "components/Icon";
import { ValidationMessage } from "@modusbox/ts-utils/lib/validation";
import Check from "bootstrap-icons/icons/check.svg";
import X from "bootstrap-icons/icons/x.svg";
import "./ValidationCard.scss";

const ActiveValidationIcon = (
  <Icon className="validation__message__icon" icon={<X />} size={20} />
);

const InactiveValidationIcon = (
  <Icon className="validation__message__icon" icon={<Check />} size={20} />
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

const ValidationMessageRow = ({ message, active }: ValidationMessage) => {
  const className = classnames([
    "validation__message",
    active && "validation__message--invalid",
    active === false && "validation__message--valid",
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

interface ValidationCardProps {
  empty?: boolean;
  messages?: ValidationMessage[];
  required?: boolean;
  invalid?: boolean;
}
export default function ValidationCard({
  empty,
  messages = [],
  required,
  invalid,
}: ValidationCardProps) {
  const unknown =
    !required && messages.every(({ active }) => active === undefined);
  const success = messages.every(({ active }) => active === false);
  const className = classnames([
    "validation__messages",
    required && "validation__messages--required",
    invalid && "validation__messages--invalid",
    success && "validation__messages--valid",
    unknown && "validation__messages--unknown",
  ]);
  return (
    <div>
      <ul className={className}>
        {messages.map(({ message, active }, i) => (
          <ValidationMessageRow
            key={i.toString()}
            message={message}
            active={empty ? undefined : active}
          />
        ))}
      </ul>
    </div>
  );
}
