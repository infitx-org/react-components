import React from "react";
import Icon from "components/Icon";
import Column from "components/Flexbox/Column";
import Box from "docs/components/Box";
import Label from "docs/components/Label";
import "./CustomIcon.scss";

import Arrow from "resources/icons/arrow.svg";
import CloseSmall from "resources/icons/close-small.svg";
import InfoSmall from "resources/icons/info-small.svg";
import WarningSign from "resources/icons/warning-sign.svg";

const items = {
  Arrow,
  CloseSmall,
  InfoSmall,
  WarningSign,
};

const IconBoxed = ({
  icon,
  name,
}: {
  icon: React.ReactElement;
  name: string;
}) => (
  <Column align="center center">
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
