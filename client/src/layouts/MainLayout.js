import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Auth from "../components/Auth/Auth";
import CustomAppBar from "../components/CustomAppBar/CustomAppBar";
import Dashboard from "../pages/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MainLayout() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CustomAppBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
          {/* <Dashboard /> */}
        </main>
      </div>
    </BrowserRouter>
  );
}
