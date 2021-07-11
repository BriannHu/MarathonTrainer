import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import classNames from "classnames";
import decode from "jwt-decode";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";

import { PrimaryItems, SecondaryItems } from "./SidebarItems";

import useStyles from "./styles";

export default function CustomAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
    if (token) {
      const decodedToken = decode(token);
      // if token is expired, log user out (should be after a year)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    // eslint-disable-next-line
  }, [location, user?.token]);

  const handleDrawerClick = () => {
    setOpen(!open);
  };

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/auth");

    setUser(null);
  };

  const anchorOpen = Boolean(anchorEl);
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
              <IconButton
                aria-owns={anchorOpen ? "menu-appbar" : undefined}
                aria-haspopup="true"
                color="inherit"
                className={classes.profile}
                onClick={handleMenu}
              >
                <Avatar
                  className={classes.purple}
                  alt={user?.result.name}
                  src={user?.result.imageUrl}
                >
                  {user?.result.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={anchorOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
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
          {PrimaryItems.map((item, index) => {
            return (
              <ListItem
                button
                className={classes.listItem}
                component={Link}
                key={item.name}
                to={item.target}
              >
                <ListItemIcon>
                  <Icon className={classes.icon}>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            );
          })}
          <Divider classes={{ root: classes.dividerColor }} />
          {SecondaryItems.map((item, index) => {
            return (
              <ListItem
                button
                className={classes.listItem}
                component={Link}
                key={item.name}
                to={item.target}
              >
                <ListItemIcon>
                  <Icon className={classes.icon}>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
