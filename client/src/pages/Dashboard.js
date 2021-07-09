import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getRuns } from "../actions/runs";

import Grid from "@material-ui/core/Grid";
import DistanceCard from "../components/Dashboard/DistanceCard";
import DurationCard from "../components/Dashboard/DurationCard";
import PaceCard from "../components/Dashboard/PaceCard";
import TargetCard from "../components/Dashboard/TargetCard";
import Chart from "../components/Dashboard/Chart";
import Schedule from "../components/Dashboard/Schedule";
import QuickAdd from "../components/Dashboard/QuickAdd";
import DisplayAllRuns from "../components/DisplayRuns/DisplayAllRuns";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRuns());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
        <DistanceCard />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <DurationCard />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <PaceCard />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <TargetCard />
      </Grid>
      <Grid item xs={12} lg={8} xl={9}>
        <Chart />
      </Grid>
      <Grid item xs={12} lg={4} xl={3}>
        <Schedule />
      </Grid>
      <Grid item xs={12} lg={4}>
        <QuickAdd />
      </Grid>
      <Grid item xs={12} lg={8}>
        <DisplayAllRuns />
      </Grid>
    </Grid>
  );
}
