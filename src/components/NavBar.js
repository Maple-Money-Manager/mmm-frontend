import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuDrawer from "./MenuDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = ({currentPage, setCurrentPage}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuDrawer currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          <Typography variant="h6" className={classes.title}>
            Maple Money Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;