import React from "react";

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
        <div>
          <input type="number" onChange={this.handleExpenseChange} />
          <button onClick={() => this.handleSaveExpense(this.state.expense)}>
            Save expense
          </button>
        </div>
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
