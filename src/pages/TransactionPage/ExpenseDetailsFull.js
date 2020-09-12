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
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useParams, Link } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

export const ExpenseDetailsFull = ({ expenseList }) => {
  const [editState, setEditState] = React.useState(false);
  let { uniqueKey } = useParams();
  const position = uniqueKey.charAt(uniqueKey.length - 1);
  if (uniqueKey.length < 0) {
    return <Grid />;
  }
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
              Amount: ${expenseList[position].expense} <br />
              Date: {expenseList[position].date.toLocaleString()} <br />
            </Typography>
          )}
          {editState && (
            <>
              <FormControl variant="outlined">
                <OutlinedInput
                  type="number"
                  id="edit-amount-field"
                  inputProps={{ "aria-label": "editExpenseInput" }}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined">
                <OutlinedInput
                  type="text"
                  id="edit-category-field"
                  inputProps={{ "aria-label": "editCategoryInput" }}
                  defaultValue={expenseList[position].category}
                />
              </FormControl>
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
                />
              </MuiPickersUtilsProvider>
            </>
          )}
        </CardContent>
        <CardActions>
          <IconButton
            onClick={() =>
              editState ? setEditState(false) : setEditState(true)
            }
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Button variant="outlined" color="primary" component={Link} to={"/"}>
        Back
      </Button>
    </Grid>
  );
};
