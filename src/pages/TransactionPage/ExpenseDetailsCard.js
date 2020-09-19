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

export default function ExpenseDetailsCard({ uniqueKey, expense, date, category }) {
  return (
    <Grid item key={uniqueKey}>
      <Card variant="outlined">
        <CardActionArea component={Link} to={`/${uniqueKey}`}>
          <CardHeader
            title="Transaction Details"
            subheader={date.toLocaleString()}
          />
          <CardContent>
            <Typography
              data-testid="expense-list"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              Category: {category} <br />
                Amount: {expense} <br />
                Date: {date.toLocaleString()} <br />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
