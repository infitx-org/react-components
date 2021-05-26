import classnames from "classnames";
import { Kind } from "types";
import Icon from "components/Icon";
import "./MessageBox.scss";

function splitLines(prev: string[], curr: string): string[] {
  return [...prev, ...curr.split(`\n`)];
}

function getMessageComponent(
  message: string,
  index: number
): React.ReactElement {
  return (
    <div key={index} className="el-message-box__message">
      {message}
    </div>
  );
}

function getMessages(message: string | string[]): React.ReactElement[] {
  const subMessages = typeof message === "string" ? [message] : message;
  return subMessages.reduce(splitLines, []).map(getMessageComponent);
}

export interface MessageBoxProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  kind?: `${Kind}` | "default";
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  fill?: string;
  message?: string | string[];
  children?: React.ReactNode;
  size?: number;
  fontSize?: number;
  center?: boolean;
  active?: boolean;
  inverted?: boolean;
}

export default function MessageBox({
  id,
  className,
  style,
  kind = "default",
  icon,
  fill = "inherit",
  message,
  children,
  size = 20,
  fontSize = 13,
  center,
  active,
  inverted,
}: MessageBoxProps) {
  if (!message && !children) {
    return null;
  }

  const higherSize = Math.max.apply(Math, [icon ? size : 0, fontSize, 20]);

  const messageBoxStyle = {
    ...style,
    padding: `${higherSize / 2}px`,
    borderWidth: `${higherSize / 10}px`,
  };

  const iconStyle = { marginRight: `${higherSize / 2}px` };

  const messagesStyle = {
    fontSize: `${fontSize}px`,
  };

  const messageBoxClassName = classnames([
    "rc-message-box",
    `rc-message-box--${kind}`,
    active && `rc-message-box--active`,
    inverted && `rc-message-box--inverted`,
    center && "rc-message-box--centered",
    className,
  ]);

  const messagesClassName = classnames([
    "rc-message-box__messages",
    center && "rc-message-box__messages--centered",
  ]);

  return (
    <div className={messageBoxClassName} id={id} style={messageBoxStyle}>
      {icon && (
        <div className="rc-message-box__icon-box" style={iconStyle}>
          <Icon
            icon={icon}
            size={size}
            className="rc-message-box__icon"
            fill={fill}
          />
        </div>
      )}
      <div className={messagesClassName} style={messagesStyle}>
        {children || getMessages(message as string)}
      </div>
    </div>
  );
}
