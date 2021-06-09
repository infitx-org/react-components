import React from "react";
import { Kind } from "types";
import Tooltip, { Position } from "components/Tooltip";

export interface WithTooltipProps {
  tooltipKind?: `${Kind}`;
  tooltipLabel?: string;
  tooltipContent?: React.ReactNode;
  tooltipPosition?: Position;
}

export default function withTooltip<P>(Component: React.ComponentType<P>) {
  return React.forwardRef(function WithTooltip(
    {
      tooltipLabel,
      tooltipKind,
      tooltipPosition,
      tooltipContent,
      ...props
    }: P & WithTooltipProps,
    ref
  ) {
    if (!tooltipLabel && !tooltipContent) {
      return <Component {...(props as P)} ref={ref} />;
    }
    return (
      <Tooltip
        label={tooltipLabel}
        kind={tooltipKind}
        position={tooltipPosition}
        content={tooltipContent}
      >
        <Component {...(props as P)} ref={ref} />
      </Tooltip>
    );
  });
}
