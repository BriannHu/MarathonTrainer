import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import classNames from "classnames";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import ScoreIcon from "@material-ui/icons/Score";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";

import useStyles from "./styles";

export default function CustomAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    //const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
    // console.log(user);
  }, [location]);

  const handleDrawerClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/auth");

    setUser(null);
  };

  return (
    <>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar disableGutters={true}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerClick}
          >
            <MenuIcon
              classes={{
                root: open
                  ? classes.menuButtonIconOpen
                  : classes.menuButtonIconClosed,
              }}
            />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Marathon Trainer
          </Typography>

          {user?.result ? (
            <>
              <IconButton color="inherit" className={classes.profile}>
                <Avatar
                  className={classes.purple}
                  alt={user?.result.name}
                  src={user?.result.imageUrl}
                >
                  {user?.result.name.charAt(0)}
                </Avatar>
              </IconButton>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/auth"
              color="inherit"
              className={classes.profile}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem
            button
            className={classes.listItem}
            key={"Dashboard"}
            component={Link}
            to="/"
          >
            <ListItemIcon>
              <DashboardIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem
            button
            className={classes.listItem}
            key={"Scores"}
            component={Link}
            to="/auth"
          >
            <ListItemIcon>
              <ScoreIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"Scores"} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
