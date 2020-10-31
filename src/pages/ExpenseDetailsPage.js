import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  Typography,
  Button,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Save as SaveIcon, Delete as DeleteIcon } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Axios from "axios";

export const ExpenseDetailsFull = ({ expenseList, triggerCallback }) => {
  const { uniqueKey } = useParams();
  const position = uniqueKey.charAt(uniqueKey.length - 1);
  const [editState, setEditState] = React.useState(false);
  const [expenseValue, setExpenseValue] = React.useState(
    expenseList[position].expense
  );
  const [categoryValue, setCategoryValue] = React.useState(
    expenseList[position].category
  );
  const [dateValue, setDateValue] = React.useState(expenseList[position].date);
  const [typeValue, setTypeValue] = React.useState(
    expenseList[position].expense > 0 ? "Income" : "Expense"
  );
  const [recordId] = React.useState(expenseList[position].id);
  const idValue = parseInt(position) + 1;

  const updateRecord = async (item) => {
    try {
      const payload = {
        id: item.id,
        expense: item.expense,
        category: item.category,
        date: item.date,
      };
      await Axios.patch("http://localhost:3000/records/:uniqueKey", payload);
      triggerCallback();
    } catch (error) {
      if (error.response.status === 400) {
        alert("Unable to update transaction.");
      }
    }
  };

  const deleteRecord = async () => {
    const id = recordId;
    try {
      await Axios.delete(`http://localhost:3000/records/${id}`);
      console.log("success");
    } catch (err) {
      console.log(err);
    }
  };

  function updateFrontend() {
    return (
      <div>
        Category: {categoryValue} <br />
        Amount:{" "}
        {typeValue === "Income"
          ? `$${Math.abs(expenseValue)}`
          : `-$${Math.abs(expenseValue)}`}
        <br />
        Date: {dateValue.toLocaleString()} <br />
      </div>
    );
  }

  if (uniqueKey.length < 0) {
    return <Grid />;
  }

  return (
    <Grid>
      <Card variant="outlined">
        <CardHeader
          title="Transaction Details"
          subheader={dateValue.toLocaleString()}
        />
        <CardContent>
          {!editState && (
            <Typography
              data-testid="expense-list"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {updateFrontend()}
            </Typography>
          )}
          {editState && (
            <Grid container direction="column">
              <Grid item>
                <FormControl variant="outlined">
                  <OutlinedInput
                    type="number"
                    id="edit-amount-field"
                    inputProps={{ "aria-label": "editExpenseInput" }}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    defaultValue={Math.abs(expenseValue)}
                    onChange={(e) => setExpenseValue(e.target.value)}
                  />
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel shrink>Type</InputLabel>
                  <Select
                    value={typeValue}
                    onChange={(e) => setTypeValue(e.target.value)}
                  >
                    <MenuItem value={"Expense"}>Expense</MenuItem>
                    <MenuItem value={"Income"}>Income</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <OutlinedInput
                    type="text"
                    id="edit-category-field"
                    inputProps={{ "aria-label": "editCategoryInput" }}
                    defaultValue={categoryValue}
                    onChange={(e) => setCategoryValue(e.target.value)}
                  />
                </FormControl>
              </Grid>

              <Grid container item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    inputProps={{ "aria-label": "editDateInput" }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    onChange={(date) => setDateValue(date)}
                    value={dateValue}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardActions>
          {!editState && (
            <IconButton onClick={() => setEditState(true)}>
              <EditIcon />
            </IconButton>
          )}
          {editState && (
            <IconButton
              onClick={() => {
                updateRecord({
                  id: idValue,
                  expense:
                    typeValue === "Income"
                      ? Math.abs(expenseValue)
                      : -Math.abs(expenseValue),
                  category: categoryValue,
                  date: dateValue,
                });
                setEditState(false);
              }}
            >
              <SaveIcon />
            </IconButton>
          )}
          <IconButton onClick={() => deleteRecord()}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Button variant="outlined" color="primary" component={Link} to={"/"}>
        Back
      </Button>
    </Grid>
  );
};
