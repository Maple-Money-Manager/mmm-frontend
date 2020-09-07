import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";

export default function ExpenseDetailsCard(expenseList) {
  return expenseList.map((transaction) => {
    return (
      <Grid
        item
        key={`${transaction.category}${transaction.expense}${transaction.date}.toLocaleString()`}
      >
        <Card variant="outlined">
          <CardActionArea>
            <CardHeader
              title="Transaction Details"
              subheader={transaction.date.toLocaleString()}
            />
            <CardContent>
              <Typography
                data-testid="expense-list"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Category: {transaction.category} <br />
                Amount: ${transaction.expense} <br />
                Date: {transaction.date.toLocaleString()} <br />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });
}
