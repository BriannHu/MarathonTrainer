import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import DistanceCard from "../components/Dashboard/DistanceCard";
import DurationCard from "../components/Dashboard/DurationCard";
import PaceCard from "../components/Dashboard/PaceCard";
import TargetCard from "../components/Dashboard/TargetCard";
import Chart from "../components/Dashboard/Chart";
import Schedule from "../components/Dashboard/Schedule";
import QuickAdd from "../components/Dashboard/QuickAdd";
import DisplayAllRuns from "../components/DisplayRuns/DisplayAllRuns";

import axios from "axios";

export default function Dashboard() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    setRuns([]); // prevents more entries from being added each render
    axios
      .get("http://localhost:5000/runs/")
      .then((response) => {
        setRuns(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(`from dashboard: ${runs}`);
    // eslint-disable-next-line
  }, []);

  const handleRunChange = (newRun) => {
    setRuns((oldRuns) => [...oldRuns, newRun]);
  };

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
      <Grid item xs={12} lg={8} xl={9}>
        <Chart />
        {/* <Paper className={classes.paper}>Card 5</Paper> */}
      </Grid>
      <Grid item xs={12} lg={4} xl={3}>
        <Schedule />
        {/* <Paper className={classes.paper}>Card 6</Paper> */}
      </Grid>
      <Grid item xs={12} lg={4}>
        <QuickAdd handleRunChange={handleRunChange} />
        {/* <Paper className={classes.paper}>Card 7</Paper> */}
      </Grid>
      <Grid item xs={12} lg={8}>
        <DisplayAllRuns allRuns={runs} />
        {/* <Paper className={classes.paper}>Card 7</Paper> */}
      </Grid>
    </Grid>
  );
}
