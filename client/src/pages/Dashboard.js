import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import DistanceCard from "../components/Dashboard/DistanceCard";
import DurationCard from "../components/Dashboard/DurationCard";
import PaceCard from "../components/Dashboard/PaceCard";
import TargetCard from "../components/Dashboard/TargetCard";
import DisplayAllRuns from "../components/DisplayRuns/DisplayAllRuns";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginRight: 0,
    width: "100%",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
        <DistanceCard />
        {/* <Paper className={classes.paper}>Card 1</Paper> */}
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <DurationCard />
        {/* <Paper className={classes.paper}>Card 2</Paper> */}
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <PaceCard />
        {/* <Paper className={classes.paper}>Card 3</Paper> */}
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <TargetCard />
        {/* <Paper className={classes.paper}>Card 4</Paper> */}
      </Grid>
      <Grid item xs={12} lg={9} xl={9}>
        <Paper className={classes.paper}>Card 5</Paper>
      </Grid>
      <Grid item xs={12} lg={3} xl={3}>
        <Paper className={classes.paper}>Card 6</Paper>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Paper className={classes.paper}>Card 7</Paper>
      </Grid>
      <Grid item xs={12} lg={9}>
        <DisplayAllRuns />
        {/* <Paper className={classes.paper}>Card 7</Paper> */}
      </Grid>
    </Grid>
  );
}
