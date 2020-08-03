import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: 0,
      expenseList: [],
    };
  }

  handleExpenseChange = (e) => {
    this.setState({
      expense: e.target.value,
    });
  };

  handleSaveExpense = (item) => {
    const newList = [...this.state.expenseList, item];
    this.setState({
      expenseList: newList,
    });
  };

  render() {
    return (
      <div>
        <Box component="div" display="inline" p={1} m={1}>
          <FormControl variant="outlined" p={1} m={1}>
            <InputLabel margin="dense" htmlFor="outlined-adornment-amount">
              Amount
            </InputLabel>
            <OutlinedInput
              type="number"
              id="outlined-adornment-amount"
              onChange={this.handleExpenseChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              top={20}
            />
          </FormControl>
        </Box>
        <Box component="div" display="inline">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => this.handleSaveExpense(this.state.expense)}
          >
            Save expense
          </Button>
        </Box>
        <div>
          <ul>
            {this.state.expenseList.map((item) => {
              return <li>${item}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default HomePage;
