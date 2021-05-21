import React from "react";
import { Kind } from "types";
import "./ColorScheme.scss";

export default {
  title: "Color Schemes",
};

function Block({ kind = "", modifier = "regular" }) {
  const className = `color-scheme color-scheme--${modifier}-${kind}`;

  return (
    <div className={className}>
      <div className="labels">
        {kind} - {modifier}
      </div>
    </div>
  );
}

function Tester({ kind = "" }) {
  const [state, setState] = React.useState("regular");
  const set = (modifier = "") => () => setState(modifier);

  const className = `color-scheme color-scheme--tester color-scheme--${state}-${kind}`;

  return (
    <div
      role="presentation"
      className={className}
      onMouseEnter={set("active")}
      onMouseLeave={set("regular")}
      onMouseDown={set("darken")}
      onMouseUp={set("active")}
    >
      <div className="labels">
        {kind} - {state}
      </div>
    </div>
  );
}

export const Default = () => (
  <>
    {Object.values(Kind).map((kind) => {
      return (
        <div>
          <Block kind={kind} />
          <Block kind={kind} modifier="active" />
          <Block kind={kind} modifier="darken" />
          <Block kind={kind} modifier="shadows" />
          <Tester kind={kind} />
        </div>
      );
    })}
  </>
);
