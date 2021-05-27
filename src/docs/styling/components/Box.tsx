import "./Box.scss";

export default function Box({
  style,
  size = "large",
  label = "",
  className = "",
  variable = "",
  children,
}) {
  return (
    <div className={`box box--${size} ${className}`} style={style}>
      {variable && <div className="variable">{variable}</div>}
      {label && <div className="labels">{label}</div>}
      {children}
    </div>
  );
}
