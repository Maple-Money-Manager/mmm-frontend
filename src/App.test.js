import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import axios from "axios";
jest.mock("axios");

beforeEach(() => {
  axios.get.mockResolvedValueOnce({ results: [] });
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("App", () => {
  it("should render the Navbar", () => {
    const { getByText } = render(<App />);
    const Navbar = getByText("Maple Money Manager");
    expect(Navbar).toBeInTheDocument();
  });
});
