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
import axios from "axios";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: 0,
      expenseList: [],
      category: "",
      selectedDate: new Date(),
      dateList: [],
    };
  }

  componentDidMount() {
    this.getExpenseRecords();
  }

  getExpenseRecords = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/records/get_records`);
      const expenseRecords = res.data.map(record => ({
        expense: record.expense,
        category: record.category,
        date: record.date,
      }));
      this.setState({
        expenseList: [...this.state.expenseList, ...expenseRecords]
      })
    } catch (err) {
      console.log(err);
    }
  }

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

  handleSaveExpense = (item, date) => {
    const newList = [...this.state.expenseList, item];
    const newDateList = [...this.state.dateList, date];
    this.setState({
      expenseList: newList,
      dateList: newDateList,
    });
  };

  displayExpenseList = () => {
    const { expenseList } = this.state;
    return expenseList.map((item) => {
      return (
        <li
          key={`${item.category}${
            item.expense
            }${item.date}.toLocaleString()`}
          data-testid="expense-list"
        >
          Category: {item.category}
          <br />
          Amount: ${item.expense}
          <br />
          Date: {item.date.toLocaleString()}
          <br />
        </li>
      );
    })
  }

  render() {
    return (
      <Container justify="center">
        <Box m={10} />
        <InputLabel htmlFor="outlined-adornment-amount">Expense Log</InputLabel>
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
          </Grid>
          <Grid item>
            <FormControl variant="outlined">
              <OutlinedInput
                type="text"
                id="outlined-adornment-category"
                inputProps={{ "aria-label": "categoryInput" }}
                onChange={this.handleCategoryChange}
                startAdornment={
                  <InputAdornment position="start">Category</InputAdornment>
                }
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
                value={this.state.selectedDate}
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
                    expense: this.state.expense,
                    date: this.state.selectedDate,
                    category: this.state.category,
                  },
                  this.state.selectedDate
                )
              }
            >
              Save expense
            </Button>
          </Grid>
        </Grid>
        <ol>
          <Box m={2}>
            {this.displayExpenseList}
          </Box>
        </ol>
      </Container>
    );
  }
}

export default HomePage;
