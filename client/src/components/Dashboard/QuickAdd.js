import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { createRun } from "../../actions/runs";
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
import { colors } from "@material-ui/core";
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
  paceOutline: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.indigo[500],
      borderWidth: "1px",
    },
    "& .MuiOutlinedInput-input": {
      color: colors.indigo[500],
    },
    "& .MuiInputLabel-outlined": {
      color: colors.indigo[500],
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
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [date, setDate] = useState(getFormattedDate(new Date()));
  const [distance, setDistance] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [paceMinutes, setPaceMinutes] = useState(0);
  const [paceSeconds, setPaceSeconds] = useState(0);
  const [distError, setDistError] = useState(false);
  const [hourError, setHourError] = useState(false);
  const [minsError, setMinsError] = useState(false);
  const [secsError, setSecsError] = useState(false);

  // Additional helper hooks for Date functionality
  // NOTE: Displaying date requires different format from submitting date.
  //       Different format is handled by getFormattedDate().
  // NOTE: The date field will automatically update each minute UNTIL
  //       the user clicks on it.
  const [displayDate, setDisplayDate] = useState(getFormattedDate(new Date()));
  const [changedDate, setChangedDate] = useState(false);

  function getFormattedDate(today) {
    const year = today.getFullYear();
    const month =
      (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1);
    const day = (today.getDate() < 10 ? "0" : "") + today.getDate();
    const hours = (today.getHours() < 10 ? "0" : "") + today.getHours();
    const mins = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
    const formattedDate = `${year}-${month}-${day}T${hours}:${mins}`;
    return formattedDate;
  }

  // If user doesn't touch Date input, it will automatically update every minute.
  // Prevents runs being registered to same minute
  useEffect(() => {
    if (!changedDate) {
      var timer = setInterval(
        () => setDisplayDate(getFormattedDate(new Date())),
        1000
      );
      return function cleanup() {
        clearInterval(timer);
      };
    }
  });

  useEffect(() => {
    var hrs = hours;
    var mins = minutes;
    var secs = seconds;
    mins = parseInt(mins) + parseInt(hrs * 60);
    var pace_mins = Math.trunc(mins / distance);
    var frac_secs = ((mins / distance) % 1) + secs / 60 / distance;
    var pace_secs = Math.round(frac_secs * 60);
    setPaceMinutes(pace_mins);
    setPaceSeconds(pace_secs);
  }, [distance, hours, minutes, seconds]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (distance === 0 || (hours === 0 && minutes === 0 && seconds === 0)) {
      setDistError(distance === 0);
      setHourError(hours === 0 && minutes === 0 && seconds === 0);
      setMinsError(hours === 0 && minutes === 0 && seconds === 0);
      setSecsError(hours === 0 && minutes === 0 && seconds === 0);
      alert("Please fill out the required entries in Quick Add.");
      return;
    }
    const run = {
      name,
      date,
      distance,
      hours,
      minutes,
      seconds,
      paceMinutes,
      paceSeconds,
    };
    dispatch(createRun(run));
  };

  const onDistanceChange = (e) => {
    if (e.target.value <= 0) {
      setDistError(true);
      return;
    }
    setDistError(false);
    setDistance(e.target.value);
  };

  const onHourChange = (e) => {
    setHourError(false);
    setHours(e.target.value);
  };

  const onMinsChange = (e) => {
    setMinsError(false);
    setMinutes(e.target.value);
  };

  const onSecsChange = (e) => {
    setSecsError(false);
    setSeconds(e.target.value);
  };

  const onDateChange = (e) => {
    const convertedDate = new Date(e.target.value);
    setDisplayDate(getFormattedDate(convertedDate));
    setDate(convertedDate.toISOString());
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
                className={classes.normalOutline}
                label="Name (optional)"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid className={classes.gridInner} container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.normalOutline}
                variant="outlined"
                type="datetime-local"
                value={displayDate}
                onChange={(e) => {
                  onDateChange(e);
                }}
                onClick={() => setChangedDate(true)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid className={classes.gridMultInner} container spacing={2}>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                value={distance}
                type="number"
                error={distError || distance < 0}
                onChange={(e) => onDistanceChange(e)}
                fullWidth
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
                error={hourError || hours < 0}
                onChange={(e) => onHourChange(e)}
                type="number"
                fullWidth
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
                error={minsError || minutes < 0 || minutes > 59}
                onChange={(e) => onMinsChange(e)}
                type="number"
                fullWidth
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
                error={secsError || seconds < 0 || seconds > 59}
                onChange={(e) => onSecsChange(e)}
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid className={classes.gridInner} container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.paceOutline}
                variant="outlined"
                inputProps={{
                  readOnly: true,
                  style: { fontWeight: 600, textAlign: "center" },
                }}
                fullWidth
                value={`${paceMinutes || 0}'${
                  paceSeconds < 10 ? "0" + paceSeconds : paceSeconds || "00"
                }"`}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
