import React from "react";
import { render, waitFor, fireEvent, within } from "@testing-library/react";
import TransactionPage from "../../pages/TransactionPage";
import userEvent from "@testing-library/user-event";
import axios from "axios";
jest.mock("axios");

beforeEach(() => {
  axios.get.mockResolvedValueOnce({ data: [{ expense: 100, category: "test", date: "11/12/1991" }] });
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("Transaction Page", () => {
  it("should render the Amount input label", async () => {
    const { findByText } = render(<TransactionPage />);
    const expenseLog = await findByText("Amount");
    expect(expenseLog).toBeInTheDocument();
  });
  it("should render the Expense form control", async () => {
    const { findByLabelText } = render(<TransactionPage />);
    const expenseFormControl = await findByLabelText("expenseInput");
    expect(expenseFormControl).toBeInTheDocument();
  });
  it("should render the Category form control", async () => {
    const { findByLabelText } = render(<TransactionPage />);
    const categoryFormControl = await findByLabelText("categoryInput");
    expect(categoryFormControl).toBeInTheDocument();
  });
  it("should render the Date picker", async () => {
    const { findByLabelText } = render(<TransactionPage />);
    const datePicker = await findByLabelText("change date");
    expect(datePicker).toBeInTheDocument();
  });
  it("should render the Save button", async () => {
    const { findByText } = render(<TransactionPage />);
    const expenseButton = await findByText("Save");
    expect(expenseButton).toBeInTheDocument();
  });
  it("should render negative amount as default and other details for the transaction details after save button is clicked", async () => {
    const { findByLabelText, findByText, findAllByTestId } = render(
      <TransactionPage />
    );
    const expenseFormControl = await findByLabelText("expenseInput");
    const categoryFormControl = await findByLabelText("categoryInput");
    const datePicker = await findByLabelText("dateInput");
    userEvent.type(expenseFormControl, "200");
    userEvent.type(categoryFormControl, "Drinks");
    userEvent.type(datePicker, "01/13/2020");
    const expenseButton = await findByText("Save");
    userEvent.click(expenseButton);
    const list = await findAllByTestId("expense-list");
    const expenseList = list.map(
      (item) => item.textContent
    );
    expect(expenseList[1]).toMatch(
      "Category: Drinks Amount: -$200 Date: January 13, 2020 12:00 AM "
    )
  });
  it("should render postive amount when income is selected", async () => {
    const { findByLabelText, findByText, findAllByTestId, findByRole } = render(
      <TransactionPage />
    );
    fireEvent.mouseDown(await findByLabelText("transactionType"));
    const listbox = within(await findByRole('listbox'));
    fireEvent.click(await listbox.findByText(/Income/i));
    const expenseFormControl = await findByLabelText("expenseInput");
    const categoryFormControl = await findByLabelText("categoryInput");
    const datePicker = await findByLabelText("dateInput");
    userEvent.type(expenseFormControl, "200");
    userEvent.type(categoryFormControl, "Drinks");
    userEvent.type(datePicker, "01/13/2020");
    const expenseButton = await findByText("Save");
    userEvent.click(expenseButton);
    const list = await findAllByTestId("expense-list");
    const expenseList = list.map(
      (item) => item.textContent
    );
    expect(expenseList[1]).toMatch(
      "Category: Drinks Amount: $200 Date: January 13, 2020 12:00 AM "
    )
  });
  it("should render list of saved items that are fetched", async () => {
    const { findAllByTestId } = render(
      <TransactionPage />
    );
    const list = await findAllByTestId("expense-list");
    const expenseList = list.map(
      (item) => item.textContent
    );
    expect(expenseList[0]).toMatch(
      "Category: test Amount: $100 Date: November 12, 1991 12:00 AM"
    );
  })
});
