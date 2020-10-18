import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
} from "@material-ui/core";
import moment from "moment";
import { useParams, Link } from "react-router-dom";

export default function ExpenseDetailsFull({ expenseList }) {
  let { uniqueKey } = useParams();
  const position = uniqueKey.charAt(uniqueKey.length - 1);
  if (uniqueKey.length < 0) {
    return <Grid />;
  }
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Card variant="outlined">
          <CardHeader
            title="Transaction Details"
            subheader={moment(expenseList[position].date).format("LLL")}
          />
          <CardContent>
            <Typography
              data-testid="expense-list"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              Category: {expenseList[position].category} <br />
              Amount: ${expenseList[position].expense} <br />
              Date: {moment(expenseList[position].date).format("LLL")} <br />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary" component={Link} to={"/"}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
