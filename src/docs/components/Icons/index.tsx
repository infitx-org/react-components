import React from "react";
import Icon from "components/Icon";
import Column from "components/Flexbox/Column";
import Box from "docs/components/Box";
import Label from "docs/components/Label";
import "./CustomIcon.scss";

import Arrow from "resources/icons/arrow.svg";
import BusinessGroup from "resources/icons/business-group.svg";
import BusinessProcesses from "resources/icons/business-processes.svg";
import BusinessProcess from "resources/icons/business_process.svg";
import Circle from "resources/icons/circle.svg";
import Cloud from "resources/icons/cloud.svg";
import Dash from "resources/icons/dash.svg";
import Documents from "resources/icons/documents.svg";
import DoubleArrow from "resources/icons/double-arrow.svg";
import Editing from "resources/icons/editing.svg";
import Errors from "resources/icons/errors.svg";
import Inactive from "resources/icons/inactive.svg";
import MagicWand from "resources/icons/magic-wand.svg";
import Onhold from "resources/icons/onhold.svg";
import Saved from "resources/icons/saved.svg";
import Settings from "resources/icons/settings.svg";
import ToggleInvisible from "resources/icons/toggle-invisible.svg";
import ToggleVisible from "resources/icons/toggle-visible.svg";
import TransactionChild from "resources/icons/transaction-child.svg";
import TransactionParent from "resources/icons/transaction-parent.svg";
import TransactionStandalone from "resources/icons/transaction-standalone.svg";
import Transactions from "resources/icons/transactions.svg";
import Transmissions from "resources/icons/transmissions.svg";
import WarningSign from "resources/icons/warning-sign.svg";

const items = {
  Arrow,
  BusinessGroup,
  BusinessProcesses,
  BusinessProcess,
  Circle,
  Cloud,
  Dash,
  Documents,
  DoubleArrow,
  Editing,
  Errors,
  Inactive,
  MagicWand,
  Onhold,
  Saved,
  Settings,
  ToggleInvisible,
  ToggleVisible,
  TransactionChild,
  TransactionParent,
  TransactionStandalone,
  Transactions,
  Transmissions,
  WarningSign,
};

const IconBoxed = ({
  icon,
  name,
}: {
  icon: React.ReactElement;
  name: string;
}) => (
  <Column align="center">
    <Box size="small" className="custom-icon">
      <Icon icon={icon} fill="inherit" size={40} />
    </Box>
    <Label size="small">{name.toLowerCase()}.svg</Label>
  </Column>
);

export default () => {
  return (
    <>
      {Object.entries(items).map(([key, Item]) => (
        <IconBoxed icon={<Item />} name={key} />
      ))}
    </>
  );
};
