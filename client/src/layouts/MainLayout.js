import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
    <div className={classes.root}>
      <CustomAppBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Dashboard />
      </main>
    </div>
  );
}
