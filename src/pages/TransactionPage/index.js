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
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import Axios from "axios";
import ExpenseDetailsCard from "./ExpenseDetailsCard";
import { BrowserRouter, Route, RouteProps, Switch } from "react-router-dom";
import ExpenseDetailsFull from "./ExpenseDetailsFull";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

class TransactionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: 0,
      expenseList: [],
      category: "",
      selectedDate: new Date(),
      dateList: [],
      type: "Expense",
    };
  }

  componentDidMount() {
    this.getExpenseRecords();
  }

  getExpenseRecords = async () => {
    try {
      const res = await Axios.get(`http://localhost:3000/records/get_records`);
      const expenseRecords = res.data.map((record) => ({
        expense: record.expense,
        category: record.category,
        date: moment(record.date).format("LLL"),
      }));
      this.setState({
        expenseList: [...expenseRecords],
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleExpenseChange = (e) => {
    this.setState({
      expense: e.target.value,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  handleCategoryChange = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  handleSaveExpense = async (item, date) => {
    try {
      const {
        expense,
        category,
        selectedDate,
        expenseList,
        dateList,
      } = this.state;
      const payload = {
        expense: expense,
        category: category,
        date: selectedDate,
      };
      const newList = [...expenseList, item];
      const newDateList = [...dateList, date];
      this.setState({
        expenseList: newList,
        dateList: newDateList,
      });
      await Axios.post(`http://localhost:3000/records/save_record`, payload);
    } catch (error) {
      if (error.response.status === 400) {
        alert("Missing information. Fill all necessary details.");
      }
    }
  };

  handleTypeChange = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  displayTransactionList = (transactionList) => {
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

  render() {
    const { classes } = this.props;
    const { type, expense, selectedDate, category, expenseList } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Container justify="center">
              <Box m={10} />
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <Grid container direction="column" component="div" spacing={3}>
                <Grid item>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      type="number"
                      id="outlined-adornment-amount"
                      inputProps={{ "aria-label": "expenseInput" }}
                      onChange={this.handleExpenseChange}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink>Type</InputLabel>
                    <Select
                      value={type}
                      onChange={this.handleTypeChange}
                      inputProps={{ "aria-label": "transactionType" }}
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
                      id="outlined-adornment-category"
                      inputProps={{ "aria-label": "categoryInput" }}
                      onChange={this.handleCategoryChange}
                      startAdornment={
                        <InputAdornment position="start">
                          Category
                        </InputAdornment>
                      }
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
                      onChange={this.handleDateChange}
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
                    onClick={() =>
                      this.handleSaveExpense(
                        {
                          expense: type === "Income" ? expense : -expense,
                          date: selectedDate,
                          category,
                        },
                        selectedDate
                      )
                    }
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction="column" spacing={3}>
                {this.displayTransactionList(expenseList)}
              </Grid>
            </Container>
          </Route>
          <Route
            exact
            path="/:uniqueKey"
            render={(routeProps) => (
              <ExpenseDetailsFull expenseList={expenseList} {...routeProps} />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const styles = (theme) => ({
  formControl: {
    marginLeft: theme.spacing(1),
    minWidth: 120,
  },
});

export default withStyles(styles)(TransactionPage);
