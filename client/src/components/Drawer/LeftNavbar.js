import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import VisibilityIcon from "@material-ui/icons/Visibility";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    color: "white",
    width: drawerWidth,
    flexShrink: 0,
  },
  divider: {
    backgroundColor: "white",
    padding: 0,
  },
  drawerPaper: {
    background: "#272725",
    width: drawerWidth,
  },
  icon: {
    color: "white",
  },
  link: {
    color: "white !important",
    padding: 0,
    textDecoration: "none",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function LeftNavbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider className={classes.divider} />
        <List>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <VisibilityIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={"View Run"} />
            </ListItem>
          </Link>
          <Divider className={classes.divider} />
          <Link to="/create" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <DirectionsRunIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={"Add Run"} />
            </ListItem>
          </Link>
          <Divider className={classes.divider} />
        </List>
      </Drawer>
    </div>
  );
}
