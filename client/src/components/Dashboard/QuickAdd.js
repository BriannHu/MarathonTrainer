import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Card,
  CardContent,
  Grid,
  OutlinedInput,
  InputAdornment,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddBoxOutlined";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    textTransform: "uppercase",
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: 20,
    },
  },
  distanceText: {
    width: "80%",
  },
  root: {
    minWidth: 275,
  },
  gridInner: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  gridMultInner: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1.5), // extra 0.5 since container spacing is 2 instead of 3
  },
  gridOuter: {
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 600,
  },
}));

export default function QuickAdd() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [distance, setDistance] = useState(0);
  const [pace, setPace] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month =
      (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1);
    const day = (today.getDate() < 10 ? "0" : "") + today.getDate();
    const hours = (today.getHours() < 10 ? "0" : "") + today.getHours();
    const mins = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
    const formattedDate = `${year}-${month}-${day}T${hours}:${mins}`;
    return formattedDate;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const duration = hours * 360 + minutes * 60 + seconds;
    const run = { name, date, distance, duration, pace };
    console.log(run);
    axios
      .post("http://localhost:5000/runs/add", run)
      .then((res) => console.log(res.data));
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <form onSubmit={onSubmit}>
          <Grid className={classes.gridOuter} container spacing={3}>
            <Grid item>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Quick Add
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                type="submit"
                startIcon={<AddIcon />}
              >
                Add Run
              </Button>
            </Grid>
          </Grid>
          <Grid className={classes.gridInner} container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth={true}
              />
            </Grid>
          </Grid>
          <Grid className={classes.gridInner} container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                type="datetime-local"
                defaultValue={getFormattedDate()}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                fullWidth={true}
              />
            </Grid>
          </Grid>
          <Grid className={classes.gridMultInner} container spacing={2}>
            <Grid item xs={9}>
              <TextField
                label="Distance"
                variant="outlined"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={3}>
              <Select native variant="outlined" fullWidth={true}>
                <option value={"km"}>km</option>
                <option value={"mi"}>mi</option>
              </Select>
            </Grid>
          </Grid>
          <Grid className={classes.gridMultInner} container spacing={2}>
            <Grid item xs={4}>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">hrs</InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "hours",
                }}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                type="number"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={4}>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">mins</InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "minutes",
                  min: 0,
                  max: 59,
                }}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                type="number"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={4}>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">secs</InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "seconds",
                  min: 0,
                  max: 59,
                }}
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                type="number"
                fullWidth={true}
              />
            </Grid>
          </Grid>
          <Grid className={classes.gridInner} container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                inputProps={{
                  readOnly: true,
                  style: { fontWeight: 600, textAlign: "center" },
                }}
                fullWidth={true}
                value={pace}
                onChange={(e) => setPace(e.target.value)}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
