import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "./index";
import { Trash } from "grommet-icons";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        padding: "20px",
        background: "var(--content-color)",
        height: "100vh",
        width: "100vw",
      }}
    >
      {children}
    </div>
  );
};

storiesOf("Button/Primary", module)
  .add("with icon", () => (
    <Container>
      <Button onClick={action("clicked")} Icon={Trash} text="Delete" />
    </Container>
  ))
  .add("text only", () => (
    <Container>
      <Button onClick={action("clicked")} text="Delete" />
    </Container>
  ))
  .add("icon only", () => (
    <Container>
      <Button onClick={action("clicked")} Icon={Trash} />
    </Container>
  ));

storiesOf("Button/Outlined", module)
  .add("with icon", () => (
    <Container>
      <Button
        type="outlined"
        onClick={action("clicked")}
        Icon={Trash}
        text="Delete"
      />
    </Container>
  ))
  .add("text only", () => (
    <Container>
      <Button type="outlined" onClick={action("clicked")} text="Delete" />
    </Container>
  ))
  .add("icon only", () => (
    <Container>
      <Button type="outlined" onClick={action("clicked")} Icon={Trash} />
    </Container>
  ));

storiesOf("Button/PlainText", module)
  .add("with icon", () => (
    <Container>
      <Button
        type="plainText"
        onClick={action("clicked")}
        Icon={Trash}
        text="Delete"
      />
    </Container>
  ))
  .add("text only", () => (
    <Container>
      <Button type="plainText" onClick={action("clicked")} text="Delete" />
    </Container>
  ))
  .add("icon only", () => (
    <Container>
      <Button type="plainText" onClick={action("clicked")} Icon={Trash} />
    </Container>
  ));
