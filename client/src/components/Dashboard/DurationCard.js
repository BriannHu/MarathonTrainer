import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { green, lightBlue, red } from "@material-ui/core/colors";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DurationIcon from "@material-ui/icons/UpdateOutlined";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import {
  getCumulativeDuration,
  getRunDuration,
  getLastRun,
  getLastWeekRuns,
  getLastMonthRuns,
  getSecondLastRun,
  getSecondLastWeekRuns,
  getSecondLastMonthRuns,
  getSeconds,
  getPercentageDiff,
} from "./CardUtilities";

const useStyles = makeStyles((theme) => ({
  arrowPositive: {
    color: green[700],
  },
  arrowNegative: {
    color: red[700],
  },
  positive: {
    color: green[700],
    marginRight: theme.spacing(1),
  },
  negative: {
    color: red[700],
    marginRight: theme.spacing(1),
  },
  avatar: {
    backgroundColor: lightBlue[500],
  },
  box: {
    paddingTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  buttonBase: {
    width: "100%",
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  root: {
    minWidth: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  gridOuter: {
    justifyContent: "space-between",
  },
  number: {
    fontWeight: 600,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    textAlign: "left",
    textTransform: "uppercase",
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function DurationCard(props) {
  const classes = useStyles();
  const runs = useSelector((state) => state.runs);

  const [display, setDisplay] = useState("run");
  const [currValue, setCurrValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [percentDiff, setPercentDiff] = useState(0);
  // 1 means current value > last value, -1 means last value > current value
  const [stateDiff, setStateDiff] = useState(0);

  const handleDisplayClick = () => {
    switch (display) {
      case "run":
        setDisplay("week");
        const lastWeekRuns = getLastWeekRuns(runs);
        const lastWeekDuration = getCumulativeDuration(lastWeekRuns);
        const secondLastWeekRuns = getSecondLastWeekRuns(runs);
        const secondLastWeekDuration =
          getCumulativeDuration(secondLastWeekRuns);
        setCurrValue(lastWeekDuration);
        setPrevValue(secondLastWeekDuration);
        setPercentDiff(
          Math.round(
            getPercentageDiff(
              getSeconds(lastWeekDuration),
              getSeconds(secondLastWeekDuration)
            )
          )
        );
        setStateDiff(lastWeekDuration >= secondLastWeekDuration ? 1 : -1);
        break;
      case "week":
        setDisplay("month");
        const lastMonthRuns = getLastMonthRuns(runs);
        const lastMonthDuration = getCumulativeDuration(lastMonthRuns);
        const secondLastMonthRuns = getSecondLastMonthRuns(runs);
        const secondLastMonthDuration =
          getCumulativeDuration(secondLastMonthRuns);
        setCurrValue(lastMonthDuration);
        setPrevValue(secondLastMonthDuration);
        setPercentDiff(
          Math.round(
            getPercentageDiff(
              getSeconds(lastMonthDuration),
              getSeconds(secondLastMonthDuration)
            )
          )
        );
        setStateDiff(lastMonthDuration >= secondLastMonthDuration ? 1 : -1);
        break;
      default:
        const lastRun = getLastRun(runs);
        const secondLastRun = getSecondLastRun(runs);
        setCurrValue(getRunDuration(lastRun));
        setPrevValue(getRunDuration(secondLastRun));
        setDisplay("run");
        setPercentDiff(
          Math.round(
            getPercentageDiff(
              getSeconds(getRunDuration(lastRun)),
              getSeconds(getRunDuration(secondLastRun))
            )
          )
        );
        setStateDiff(lastRun.distance >= secondLastRun.distance ? 1 : -1);
    }
  };

  useEffect(() => {
    if (runs.length > 0) {
      const lastRun = getLastRun(runs);
      const secondLastRun = getSecondLastRun(runs);
      setCurrValue(getRunDuration(lastRun));
      setPrevValue(getRunDuration(secondLastRun));
      setPercentDiff(
        Math.round(
          getPercentageDiff(
            getSeconds(getRunDuration(lastRun)),
            getSeconds(getRunDuration(secondLastRun))
          )
        )
      );
      setStateDiff(lastRun.distance >= secondLastRun.distance ? 1 : -1);
    }
  }, [runs]);

  return (
    <ButtonBase className={classes.buttonBase} onClick={handleDisplayClick}>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Grid className={classes.gridOuter} container spacing={3}>
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Duration
              </Typography>
              <Typography
                className={classes.number}
                color="textPrimary"
                variant="h4"
              >
                {currValue} hrs
              </Typography>
            </Grid>

            <Grid item>
              <Avatar className={classes.avatar}>
                <DurationIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box className={classes.box}>
            {stateDiff >= 0 ? (
              <ArrowUpwardIcon className={classes.arrowPositive} />
            ) : (
              <ArrowDownwardIcon className={classes.arrowNegative} />
            )}
            <Typography
              className={stateDiff >= 0 ? classes.positive : classes.negative}
              variant="body2"
            >
              {percentDiff}%
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Since last {display} ({prevValue} hrs)
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
