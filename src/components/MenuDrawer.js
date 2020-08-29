import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import CategoryIcon from "@material-ui/icons/Category";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const MenuDrawer = ({ currentPage, setCurrentPage }) => {
  const classes = useStyles();
  const [menuState, setMenuState] = React.useState(false);
  const anchor = "left";
  const checkAndUpdatePage = (buttonName) => {
    if (currentPage !== buttonName) {
      setCurrentPage(buttonName);
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMenuState({ ...menuState, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <ListItem
          button
          key={"Home"}
          onClick={() => checkAndUpdatePage("Home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem
          button
          key={"Lorem"}
          onClick={() => checkAndUpdatePage("Lorem")}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary={"Lorem"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(anchor, true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={anchor}
          open={menuState[anchor]}
          onClose={toggleDrawer(anchor, false)}
          aria-label="drawer">
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default MenuDrawer;
