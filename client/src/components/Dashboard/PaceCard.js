import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { green, purple, red } from "@material-ui/core/colors";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import PaceIcon from "@material-ui/icons/SpeedOutlined";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import {
  getCumulativeDistance,
  getCumulativeDuration,
  getTotalRunPace,
  getRunPace,
  getLastRun,
  getLastWeekRuns,
  getLastMonthRuns,
  getSecondLastRun,
  getSecondLastWeekRuns,
  getSecondLastMonthRuns,
  getSecondsFromPace,
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
    backgroundColor: purple[500],
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

export default function PaceCard(props) {
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
        const lastWeekDistance = getCumulativeDistance(lastWeekRuns);
        const lastWeekDuration = getCumulativeDuration(lastWeekRuns);
        const lastWeekPace = getTotalRunPace(
          lastWeekDistance,
          lastWeekDuration
        );

        const secondLastWeekRuns = getSecondLastWeekRuns(runs);
        const secondLastWeekDistance =
          getCumulativeDistance(secondLastWeekRuns);
        const secondLastWeekDuration =
          getCumulativeDuration(secondLastWeekRuns);
        const secondLastWeekPace = getTotalRunPace(
          secondLastWeekDistance,
          secondLastWeekDuration
        );

        setCurrValue(lastWeekPace);
        setPrevValue(secondLastWeekPace);

        setPercentDiff(
          Math.round(
            getPercentageDiff(
              getSecondsFromPace(lastWeekPace),
              getSecondsFromPace(secondLastWeekPace)
            )
          )
        );
        setStateDiff(
          getSecondsFromPace(lastWeekPace) >=
            getSecondsFromPace(secondLastWeekPace)
            ? 1
            : -1
        );
        break;
      case "week":
        setDisplay("month");
        const lastMonthRuns = getLastMonthRuns(runs);
        const lastMonthDistance = getCumulativeDistance(lastMonthRuns);
        const lastMonthDuration = getCumulativeDuration(lastMonthRuns);
        const lastMonthPace = getTotalRunPace(
          lastMonthDistance,
          lastMonthDuration
        );

        const secondLastMonthRuns = getSecondLastMonthRuns(runs);
        const secondLastMonthDistance =
          getCumulativeDistance(secondLastMonthRuns);
        const secondLastMonthDuration =
          getCumulativeDuration(secondLastMonthRuns);
        const secondLastMonthPace = getTotalRunPace(
          secondLastMonthDistance,
          secondLastMonthDuration
        );

        setCurrValue(lastMonthPace);
        setPrevValue(secondLastMonthPace);

        setPercentDiff(
          Math.round(
            getPercentageDiff(
              getSecondsFromPace(lastMonthPace),
              getSecondsFromPace(secondLastMonthPace)
            )
          )
        );
        setStateDiff(
          getSecondsFromPace(lastMonthPace) >=
            getSecondsFromPace(secondLastMonthPace)
            ? 1
            : -1
        );
        break;
      default:
        setDisplay("run");
        const lastRun = getLastRun(runs);
        const secondLastRun = getSecondLastRun(runs);
        const lastRunPace = getRunPace(lastRun);
        const secondLastRunPace = getRunPace(secondLastRun);

        setCurrValue(lastRunPace);
        setPrevValue(secondLastRunPace);
        setPercentDiff(
          Math.round(
            getPercentageDiff(
              getSecondsFromPace(lastRunPace),
              getSecondsFromPace(secondLastRunPace)
            )
          )
        );
        setStateDiff(
          getSecondsFromPace(lastRunPace) >=
            getSecondsFromPace(secondLastRunPace)
            ? 1
            : -1
        );
    }
  };

  useEffect(() => {
    if (runs.length > 0) {
      const lastRun = getLastRun(runs);
      const secondLastRun = getSecondLastRun(runs);
      const lastRunPace = getRunPace(lastRun);
      const secondLastRunPace = getRunPace(secondLastRun);

      setCurrValue(lastRunPace);
      setPrevValue(secondLastRunPace);
      setPercentDiff(
        Math.round(
          getPercentageDiff(
            getSecondsFromPace(lastRunPace),
            getSecondsFromPace(secondLastRunPace)
          )
        )
      );
      setStateDiff(
        getSecondsFromPace(lastRunPace) >= getSecondsFromPace(secondLastRunPace)
          ? 1
          : -1
      );
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
                Pace
              </Typography>
              <Typography
                className={classes.number}
                color="textPrimary"
                variant="h4"
              >
                {currValue} avg
              </Typography>
            </Grid>

            <Grid item>
              <Avatar className={classes.avatar}>
                <PaceIcon />
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
              Since last {display} ({prevValue} avg)
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
