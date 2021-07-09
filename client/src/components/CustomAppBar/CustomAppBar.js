import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";

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

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(0deg)",
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(180deg)",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    backgroundColor: colors.indigo[900],
    color: "white",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: colors.indigo[900],
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  icon: {
    color: "white",
  },
  profile: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  listItem: {
    "&:hover": {
      color: "white",
      opacity: 0.75,
    },
  },
}));

export default function CustomAppBar2() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    //const token = user?.token;
    //console.log(token);
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [user?.token]);

  const handleDrawerClick = () => {
    setOpen(!open);
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
            <IconButton color="inherit" className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                src={user?.result.imageUrl}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
            </IconButton>
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
