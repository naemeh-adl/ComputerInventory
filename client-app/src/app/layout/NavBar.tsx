import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
  const { ComputerStore } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item className="TestableItem" header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          <span className="Title">Computer Inventory System</span>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => ComputerStore.openForm()}
            primary
            content="Create Computer"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
