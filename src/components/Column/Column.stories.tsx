/* eslint no-console: "off" */
import React from "react";
import Column from "./Column";

export default {
  title: "Column",
  component: Column,
};

const ColumnStyle = {
  backgroundColor: "#eee",
  height: "200px",
  margin: "5px",
};

const smallBlockStyle = {
  background: "#ccc",
  margin: "5px",
  height: "40px",
  width: "40px",
};

const bigBlockStyle = {
  background: "#ddd",
  margin: "5px",
  height: "80px",
  width: "80px",
};

const Block = () => <div style={smallBlockStyle} />;
const BlockBig = () => <div style={bigBlockStyle} />;

const Blocks = () => (
  <>
    <Block key="block-block-1" />
    <BlockBig key="block-blockbig-1" />
    <Block key="block-block-2" />
    <BlockBig key="block-blockbig-2" />
  </>
);

export const AlignLeft = () => (
  <div style={{ alignItems: "center", justifyContent: "space-between" }}>
    <Column align="left top" style={ColumnStyle}>
      <Blocks />
    </Column>
    <Column align="left center" style={ColumnStyle}>
      <Blocks />
    </Column>
    <Column align="left bottom" style={ColumnStyle}>
      <Blocks />
    </Column>
  </div>
);

export const AlignCenter = () => (
  <div style={{ alignItems: "center", justifyContent: "space-between" }}>
    <Column align="center top" style={ColumnStyle}>
      <Blocks />
    </Column>
    <Column align="center center" style={ColumnStyle}>
      <Blocks />
    </Column>
    <Column align="center bottom" style={ColumnStyle}>
      <Blocks />
    </Column>
  </div>
);

export const AlignRight = () => (
  <div style={{ alignItems: "center", justifyContent: "space-between" }}>
    <Column align="right top" style={ColumnStyle}>
      <Blocks />
    </Column>
    <Column align="right center" style={ColumnStyle}>
      <Blocks />
    </Column>
    <Column align="right bottom" style={ColumnStyle}>
      <Blocks />
    </Column>
  </div>
);

export const Wrap = () => (
  <div style={{ alignItems: "center", justifyContent: "center" }}>
    <Column style={ColumnStyle} wrap>
      {[...Array(30)].map((_, i) => (
        <BlockBig key={i.toString()} />
      ))}
    </Column>
  </div>
);
