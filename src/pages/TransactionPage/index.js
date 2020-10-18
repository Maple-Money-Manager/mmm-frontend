import React from "react";
import { Grid, Container, Button, Box, OutlinedInput } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Axios from "axios";
import ExpenseDetailsCard from "./ExpenseDetailsCard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { ExpenseDetailsFull } from "./ExpenseDetailsFull";

const TransactionPage = (props) => {
  const { classes } = props;
  const [expense, setExpense] = React.useState(undefined);
  const [transactionList, setTransactionList] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [dateList, setDateList] = React.useState([]);
  const [type, setType] = React.useState("Expense");
  const [toUpdate, setToUpdate] = React.useState(false);

  //call when update bool is true
  React.useEffect(() => {
    getTransactionRecords();
    setToUpdate(false);
  }, [toUpdate]);

  const getTransactionRecords = async () => {
    try {
      const res = await Axios.get(`http://localhost:3000/records/get_records`);
      const transactionRecords = res.data.map((record) => ({
        expense: record.expense,
        category: record.category,
        date: record.date,
      }));
      setTransactionList([...transactionRecords]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveExpense = async (item, date) => {
    try {
      const payload = {
        expense: expense,
        category: category,
        date: selectedDate,
      };
      const newList = [...transactionList, item];
      const newDateList = [...dateList, date];
      setTransactionList(newList);
      setDateList(newDateList);
      await Axios.post(`http://localhost:3000/records/save_record`, payload);
    } catch (error) {
      if (error.response.status === 400) {
        alert("Missing information. Fill all necessary details.");
      }
    }
  };

  function triggerCallback() {
    setToUpdate(true);
  }

  const displayTransactionList = (transactionList) => {
    return transactionList.map((transaction, index) => {
      const uniqueKey = `${transaction.category}${transaction.expense}${transaction.date}${index}`;
      const expense =
        transaction.expense >= 0
          ? `$${transaction.expense}`
          : `-$${Math.abs(transaction.expense)}`;
      return (
        <ExpenseDetailsCard
          key={uniqueKey}
          uniqueKey={uniqueKey}
          expense={expense}
          date={transaction.date}
          category={transaction.category}
        />
      );
    });
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Container justify="center">
            <Box m={10} />
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <Grid container direction="column" component="div" spacing={3}>
              <Grid item>
                <FormControl variant="outlined">
                  <OutlinedInput
                    type="number"
                    id="outlined-adornment-amount"
                    inputProps={{ "aria-label": "expenseInput" }}
                    onChange={(e) => setExpense(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink label="transactionType">
                    Type
                  </InputLabel>
                  <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    defaultValue="Expense"
                    inputProps={{ "aria-label": "transactionType" }}>
                    <MenuItem value={"Expense"}>Expense</MenuItem>
                    <MenuItem value={"Income"}>Income</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <OutlinedInput
                    type="text"
                    id="outlined-adornment-category"
                    inputProps={{ "aria-label": "categoryInput" }}
                    onChange={(e) => setCategory(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">Category</InputAdornment>
                    }
                    defaultValue={""}
                  />
                </FormControl>
              </Grid>
              <Grid container item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    inputProps={{ "aria-label": "dateInput" }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    handleSaveExpense(
                      {
                        expense: type === "Income" ? expense : -expense,
                        date: selectedDate,
                        category,
                      },
                      selectedDate
                    );
                  }}>
                  Save
                </Button>
              </Grid>
            </Grid>
            <Grid container direction="column" spacing={3}>
              {displayTransactionList(transactionList)}
            </Grid>
          </Container>
        </Route>
        <Route
          exact
          path="/:uniqueKey"
          render={(routeProps) => (
            <ExpenseDetailsFull
              expenseList={transactionList}
              {...routeProps}
              triggerCallback={() => triggerCallback()}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

const styles = (theme) => ({
  formControl: {
    marginLeft: theme.spacing(1),
    minWidth: 120,
  },
});

export default withStyles(styles)(TransactionPage);
