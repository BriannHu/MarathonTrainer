import React, { useState, useEffect } from "react";
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

import axios from "axios";

export default function Dashboard() {
  const [runs, setRuns] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRuns());
  }, [dispatch]);

  // useEffect(() => {
  //   setRuns([]); // prevents more entries from being added each render
  //   axios
  //     .get("http://localhost:5000/runs/")
  //     .then((response) => {
  //       setRuns(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   // eslint-disable-next-line
  // }, []);

  const createData = (
    id,
    name,
    date,
    distance,
    hours,
    minutes,
    seconds,
    paceMinutes,
    paceSeconds
  ) => ({
    // pre-emptively set MongoDB ID
    // can add multiple runs and select individually
    // otherwise have to refresh page to load runs from MongoDB for _id's
    _id: id,
    name,
    date,
    distance,
    hours,
    minutes,
    seconds,
    paceMinutes,
    paceSeconds,
    isEditMode: false,
  });

  const handleRunChange = (newRun, id) => {
    setRuns((oldRuns) => [
      ...oldRuns,
      createData(
        id,
        newRun.name,
        newRun.date,
        newRun.distance,
        newRun.hours,
        newRun.minutes,
        newRun.seconds,
        newRun.paceMinutes,
        newRun.paceSeconds
      ),
    ]);
  };

  const handleRunDelete = (selected) => {
    selected.forEach((id) => {
      axios
        .delete("http://localhost:5000/runs/" + id)
        .then((res) => console.log(res.data));
    });
    const newRuns = runs.filter((run) => selected.indexOf(run._id) < 0); // can't be found in array
    setRuns(newRuns);
  };

  const handleRunEdit = (run, id) => {
    setRuns((state) => {
      return runs.map((run) => {
        axios
          .post("http://localhost:5000/runs/edit/" + run._id, run)
          .then((res) => console.log(res.data));
        if (run._id === id) {
          return { ...run, isEditMode: !run.isEditMode };
        }
        return run;
      });
    });
  };

  const handleRunEditChange = (e, input_run) => {
    const value = e.target.value;
    const name = e.target.name;
    const newRuns = runs.map((run) => {
      if (run._id === input_run._id) {
        return { ...run, [name]: value };
      }
      return run;
    });
    setRuns(newRuns);
  };

  const handleRunRevert = (newRuns) => {
    setRuns(newRuns);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
        <DistanceCard allRuns={runs} />
        {/* <Paper className={classes.paper}>Card 1</Paper> */}
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <DurationCard allRuns={runs} />
        {/* <Paper className={classes.paper}>Card 2</Paper> */}
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <PaceCard allRuns={runs} />
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
        <DisplayAllRuns
          allRuns={runs}
          handleRunDelete={handleRunDelete}
          handleRunEdit={handleRunEdit}
          handleRunEditChange={handleRunEditChange}
          handleRunRevert={handleRunRevert}
        />
        {/* <Paper className={classes.paper}>Card 7</Paper> */}
      </Grid>
    </Grid>
  );
}
