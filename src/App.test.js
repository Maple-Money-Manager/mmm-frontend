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

describe("Transaction Page", () => {
  it("should render the Navbar", () => {
    const { getByText } = render(<App />);
    const Navbar = getByText("Maple Money Manager");
    expect(Navbar).toBeInTheDocument();
  });
  it("should render the Expense log input label", () => {
    const { getByText } = render(<App />);
    const expenseLog = getByText("Expense Log");
    expect(expenseLog).toBeInTheDocument();
  });
  it("should render the Expense form control", () => {
    const { getByLabelText } = render(<App />);
    const expenseFormControl = getByLabelText("expenseInput");
    expect(expenseFormControl).toBeInTheDocument();
  });
  it("should render the Category form control", () => {
    const { getByLabelText } = render(<App />);
    const categoryFormControl = getByLabelText("categoryInput");
    expect(categoryFormControl).toBeInTheDocument();
  });
  it("should render the Date picker", () => {
    const { getByLabelText } = render(<App />);
    const datePicker = getByLabelText("change date");
    expect(datePicker).toBeInTheDocument();
  });
  it("should render the Save expense button", () => {
    const { getByText } = render(<App />);
    const expenseButton = getByText("Save expense");
    expect(expenseButton).toBeInTheDocument();
  });
  it("should render details of expenses after save expense button is clicked", () => {
    const { getByLabelText, getByText, getAllByTestId } = render(<App />);
    const expenseFormControl = getByLabelText("expenseInput");
    const categoryFormControl = getByLabelText("categoryInput");
    const datePicker = getByLabelText("dateInput");
    userEvent.type(expenseFormControl, "100");
    userEvent.type(categoryFormControl, "Hello");
    userEvent.type(datePicker, "08/12/2020");
    const expenseButton = getByText("Save expense");
    userEvent.click(expenseButton);
    const expenseList = getAllByTestId("expense-list").map(
      (item) => item.textContent
    );
    expect(expenseList[0]).toMatch("Category: Hello");
    expect(expenseList[0]).toMatch("Amount: $100");
    expect(expenseList[0]).toMatch("Date: 12/08/2020");
  });
});
