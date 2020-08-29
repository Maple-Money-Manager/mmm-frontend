import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("Menu Drawer rendering", () => {
  test("Menu Drawer slides in when menu button is clicked", () => {
    const { getByLabelText } = render(<App />);
    const menuButton = getByLabelText("menu");
    menuButton.click();
    const drawer = getByLabelText("drawer");
    expect(drawer).toBeInTheDocument();
  });
});
