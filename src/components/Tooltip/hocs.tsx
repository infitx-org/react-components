import React from "react";
import { Kind } from "types";
import Tooltip, { Position } from "./Tooltip";

export interface WithTooltipProps {
  tooltipKind?: `${Kind}`;
  tooltipLabel?: string;
  tooltipContent?: React.ReactNode;
  tooltipPosition?: Position;
}

export default function withTooltip<P>(Component: React.ComponentType<P>) {
  return React.forwardRef(function TooltipWrapper(
    props: P & WithTooltipProps,
    ref
  ) {
    if (!props.tooltipLabel && !props.tooltipContent) {
      return <Component {...(props as P)} ref={ref} />;
    }
    return (
      <Tooltip
        label={props.tooltipLabel}
        kind={props.tooltipKind}
        position={props.tooltipPosition}
        content={props.tooltipContent}
      >
        <Component {...(props as P)} ref={ref} />
      </Tooltip>
    );
  });
}
