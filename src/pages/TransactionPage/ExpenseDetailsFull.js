import React from "react";
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
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Save as SaveIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { useParams, Link } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

export const ExpenseDetailsFull = ({ expenseList }) => {
  const [editState, setEditState] = React.useState(false);
  const [expenseValue, setExpenseValue] = React.useState(undefined);
  const [categoryValue, setCategoryValue] = React.useState(undefined);
  const [dateValue, setDateValue] = React.useState(undefined);
  const [typeValue, setTypeValue] = React.useState("Income");

  let { uniqueKey } = useParams();
  const position = uniqueKey.charAt(uniqueKey.length - 1);
  if (uniqueKey.length < 0) {
    return <Grid />;
  }
  const type = expenseList[position].expense > 0 ? "Income" : "Expense";

  return (
    <Grid>
      <Card variant="outlined">
        <CardHeader
          title="Transaction Details"
          subheader={expenseList[position].date.toLocaleString()}
        />
        <CardContent>
          {!editState && (
            <Typography
              data-testid="expense-list"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              Category: {expenseList[position].category} <br />
              Amount:{" "}
              {expenseList[position].expense > 0
                ? `$${expenseList[position].expense}`
                : `-$${Math.abs(expenseList[position].expense)}`}
              <br />
              Date: {expenseList[position].date.toLocaleString()} <br />
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
                    defaultValue={Math.abs(expenseList[position].expense)}
                    onChange={(e) => setExpenseValue(e.target.value)}
                  />
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel shrink>Type</InputLabel>
                  <Select
                    value={type}
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
                    defaultValue={expenseList[position].category}
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
                    onChange={(e) => setDateValue(e.target.value)}
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
                setEditState(false);
                console.log('update');
              }}
            >
              <SaveIcon />
            </IconButton>
          )}
          <IconButton onClick={() => console.log("delete")}>
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
