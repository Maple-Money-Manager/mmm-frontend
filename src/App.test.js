import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import App from "./App";

describe("Rendering of components", () => {
  test("Navbar renders", () => {
    const { getByText } = render(<App />);
    const Navbar = getByText("Maple Money Manager");
    expect(Navbar).toBeInTheDocument();
  });
  test("Expense log input label renders", () => {
    const { getByText } = render(<App />);
    const expenseLog = getByText("Expense Log");
    expect(expenseLog).toBeInTheDocument();
  });
  test("Expense form control renders", () => {
    const { getByLabelText } = render(<App />);
    const expenseFormControl = getByLabelText("expenseInput");
    expect(expenseFormControl).toBeInTheDocument();
  });
  test("Category form control renders", () => {
    const { getByLabelText } = render(<App />);
    const categoryFormControl = getByLabelText("categoryInput");
    expect(categoryFormControl).toBeInTheDocument();
  });
  test("Date picker renders", () => {
    const { getByLabelText } = render(<App />);
    const datePicker = getByLabelText("change date");
    expect(datePicker).toBeInTheDocument();
  });
  test("Save expense button renders", () => {
    const { getByText } = render(<App />);
    const expenseButton = getByText("Save expense");
    expect(expenseButton).toBeInTheDocument();
  });
});

// test("Rendering of saved expense", async () => {
//   const { getByLabelText, getByText } = render(<App />);
//   const expenseFormControl = getByLabelText("expenseInput");
//   const categoryFormControl = getByLabelText("categoryInput");
//   const datePicker = getByLabelText("dateInput");
//   fireEvent.change(expenseFormControl, { target: { value: 20 } });
//   fireEvent.change(categoryFormControl, { target: { value: "Food" } });
//   fireEvent.change(datePicker, {
//     target: { value: "08/21/2020" },
//   });
//   const expenseButton = getByText("Save expense");
//   fireEvent.click(expenseButton);
//   wait(expect(getByText("20")).toBeInTheDocument());
// });
