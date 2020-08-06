import React from 'react';
import { Grid, Container, Button, Box, OutlinedInput } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: 0,
      expenseList: [],
      dateInput: '',
      dateList: [],
    };
  }

  handleExpenseChange = (e) => {
    this.setState({
      expense: e.target.value,
    });
  };
  handleChangeDate = (e) => {
    this.setState({
      dateInput: e.target.value,
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

  savingFunctionality = () => {};

  render() {
    return (
      <Container justify="center">
        <Box m={10} />
        <InputLabel htmlFor="outlined-adornment-amount">Expense Log</InputLabel>
        <Grid container component="div" spacing={3}>
          <Grid item>
            <FormControl variant="outlined">
              <OutlinedInput
                type="number"
                id="outlined-adornment-amount"
                onChange={this.handleExpenseChange}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <OutlinedInput
                type="string"
                id="outlined-adornment-date"
                onChange={this.handleChangeDate}
                startAdornment={
                  <InputAdornment position="start">Date</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                this.handleSaveExpense(this.state.expense, this.state.dateInput)
              }
            >
              Save expense
            </Button>
          </Grid>
        </Grid>
        <ol>
          <Box m={2}>
            {this.state.expenseList.map((item) => {
              return <li>${item}</li>;
            })}
            {this.state.dateList.map((item) => {
              return <li>Expense Date{item}</li>;
            })}
          </Box>
        </ol>
      </Container>
    );
  }
}

export default HomePage;
