import React from "react";
import Icon from "components/Icon";
import Row from "components/Layout/Row";
import Box from "docs/styling/components/Box";
import "./CustomIcon.scss";

import Arrow from "assets/icons/arrow.svg";
import BusinessGroup from "assets/icons/business-group.svg";
import BusinessProcesses from "assets/icons/business-processes.svg";
import BusinessProcess from "assets/icons/business_process.svg";
import Circle from "assets/icons/circle.svg";
import Cloud from "assets/icons/cloud.svg";
import Dash from "assets/icons/dash.svg";
import Documents from "assets/icons/documents.svg";
import DoubleArrow from "assets/icons/double-arrow.svg";
import Editing from "assets/icons/editing.svg";
import Errors from "assets/icons/errors.svg";
import Inactive from "assets/icons/inactive.svg";
import MagicWand from "assets/icons/magic-wand.svg";
import Onhold from "assets/icons/onhold.svg";
import Saved from "assets/icons/saved.svg";
import Settings from "assets/icons/settings.svg";
import ToggleInvisible from "assets/icons/toggle-invisible.svg";
import ToggleVisible from "assets/icons/toggle-visible.svg";
import TransactionChild from "assets/icons/transaction-child.svg";
import TransactionParent from "assets/icons/transaction-parent.svg";
import TransactionStandalone from "assets/icons/transaction-standalone.svg";
import Transactions from "assets/icons/transactions.svg";
import Transmissions from "assets/icons/transmissions.svg";
import WarningSign from "assets/icons/warning-sign.svg";

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
  <Box label={name} size="medium" className="custom-icon">
    <Icon icon={icon} fill="inherit" size={40} />
  </Box>
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
