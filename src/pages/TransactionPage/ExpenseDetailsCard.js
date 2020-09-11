import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function ExpenseDetailsCard(expenseList) {
  return expenseList.map((transaction, index) => {
    const uniqueKey = `${transaction.category}${transaction.expense}${transaction.date}${index}`;
    return (
      <Grid item key={uniqueKey}>
        <Card variant="outlined">
          <CardActionArea component={Link} to={`/${uniqueKey}`}>
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
