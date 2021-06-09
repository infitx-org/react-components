import React, { forwardRef, ComponentType } from "react";
import { Kind } from "types";
import Tooltip, { Position } from "components/Tooltip";

export interface WithTooltipProps {
  tooltipKind?: `${Kind}`;
  tooltipLabel?: string;
  tooltipContent?: React.ReactNode;
  tooltipPosition?: Position;
}

export default function withTooltip<T, Props>(Component: ComponentType<Props>) {
  return forwardRef<T, Props & WithTooltipProps>(function WithTooltip(
    {
      tooltipLabel,
      tooltipKind,
      tooltipPosition,
      tooltipContent,
      ...props
    }: Props & WithTooltipProps,
    ref
  ) {
    if (!tooltipLabel && !tooltipContent) {
      return <Component {...(props as Props)} ref={ref} />;
    }
    return (
      <Tooltip
        label={tooltipLabel}
        kind={tooltipKind}
        position={tooltipPosition}
        content={tooltipContent}
      >
        <Component {...(props as Props)} ref={ref} />
      </Tooltip>
    );
  });
}
