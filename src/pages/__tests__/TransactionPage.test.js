import React from "react";
import { render, waitFor } from "@testing-library/react";
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
  it("should render the Expense log input label", () => {
    const { getByText } = render(<TransactionPage />);
    const expenseLog = getByText("Expense Log");
    expect(expenseLog).toBeInTheDocument();
  });
  it("should render the Expense form control", () => {
    const { getByLabelText } = render(<TransactionPage />);
    const expenseFormControl = getByLabelText("expenseInput");
    expect(expenseFormControl).toBeInTheDocument();
  });
  it("should render the Category form control", () => {
    const { getByLabelText } = render(<TransactionPage />);
    const categoryFormControl = getByLabelText("categoryInput");
    expect(categoryFormControl).toBeInTheDocument();
  });
  it("should render the Date picker", () => {
    const { getByLabelText } = render(<TransactionPage />);
    const datePicker = getByLabelText("change date");
    expect(datePicker).toBeInTheDocument();
  });
  it("should render the Save expense button", () => {
    const { getByText } = render(<TransactionPage />);
    const expenseButton = getByText("Save expense");
    expect(expenseButton).toBeInTheDocument();
  });
  it("should render details of expenses after save expense button is clicked", async () => {
    const { getByLabelText, getByText, getAllByTestId } = render(
      <TransactionPage />
    );
    const expenseFormControl = getByLabelText("expenseInput");
    const categoryFormControl = getByLabelText("categoryInput");
    const datePicker = getByLabelText("dateInput");
    userEvent.type(expenseFormControl, "100");
    userEvent.type(categoryFormControl, "Hello");
    userEvent.type(datePicker, "01/13/2020");
    const expenseButton = getByText("Save expense");
    userEvent.click(expenseButton);
    axios.post.mockResolvedValueOnce({ data: [] });
    await waitFor(() => {
      const expenseList = getAllByTestId("expense-list").map(
        (item) => item.textContent
      );
      expect(expenseList[0]).toMatch(
        "Category: Hello Amount: $100 Date: 13/01/2020, 12:00:00 am "
      )
    });
  });
  it("should render list of saved items that are fetched", async () => {
    const { getAllByTestId } = render(
      <TransactionPage />
    );
    await waitFor(() => {
      const expenseList = (getAllByTestId("expense-list").map(
        (item) => item.textContent
      ))
      expect(expenseList[0]).toMatch(
        "Category: test Amount: $100 Date: 11/12/1991"
      );
    })
  })
});