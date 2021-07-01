import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { green, red, deepOrange } from "@material-ui/core/colors";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DistanceIcon from "@material-ui/icons/RoomOutlined";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import {
  getCumulativeDistance,
  getLastRun,
  getLastWeekRuns,
  getLastMonthRuns,
  getSecondLastRun,
  getSecondLastWeekRuns,
  getSecondLastMonthRuns,
  getPercentageDiff,
} from "./CardUtilities";

const useStyles = makeStyles((theme) => ({
  arrowPositive: {
    color: green[700],
  },
  arrowNegative: {
    color: red[700],
  },
  buttonBase: {
    width: "100%",
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
    backgroundColor: deepOrange[500],
  },
  box: {
    paddingTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
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
    textTransform: "uppercase",
    textAlign: "left",
  },
}));

export default function DistanceCard(props) {
  const classes = useStyles();
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
        const lastWeekRuns = getLastWeekRuns(props.allRuns);
        const lastWeekDistance = getCumulativeDistance(lastWeekRuns);
        const secondLastWeekRuns = getSecondLastWeekRuns(props.allRuns);
        const secondLastWeekDistance =
          getCumulativeDistance(secondLastWeekRuns);
        setCurrValue(lastWeekDistance);
        setPrevValue(secondLastWeekDistance);
        setPercentDiff(
          Math.round(
            getPercentageDiff(lastWeekDistance, secondLastWeekDistance)
          )
        );
        setStateDiff(lastWeekDistance >= secondLastWeekDistance ? 1 : -1);
        break;
      case "week":
        setDisplay("month");
        const lastMonthRuns = getLastMonthRuns(props.allRuns);
        const lastMonthDistance = getCumulativeDistance(lastMonthRuns);
        const secondLastMonthRuns = getSecondLastMonthRuns(props.allRuns);
        const secondLastMonthDistance =
          getCumulativeDistance(secondLastMonthRuns);
        setCurrValue(lastMonthDistance);
        setPrevValue(secondLastMonthDistance);
        setPercentDiff(
          Math.round(
            getPercentageDiff(lastMonthDistance, secondLastMonthDistance)
          )
        );
        setStateDiff(lastMonthDistance >= secondLastMonthDistance ? 1 : -1);
        break;
      default:
        const lastRun = getLastRun(props.allRuns);
        const secondLastRun = getSecondLastRun(props.allRuns);
        setCurrValue(lastRun.distance);
        setPrevValue(secondLastRun.distance);
        setDisplay("run");
        setPercentDiff(
          Math.round(
            getPercentageDiff(lastRun.distance, secondLastRun.distance)
          )
        );
        setStateDiff(lastRun.distance >= secondLastRun.distance ? 1 : -1);
    }
  };

  useEffect(() => {
    if (props.allRuns.length > 0) {
      const lastRun = getLastRun(props.allRuns);
      const secondLastRun = getSecondLastRun(props.allRuns);
      setCurrValue(lastRun.distance);
      setPrevValue(secondLastRun.distance);
      setPercentDiff(
        Math.round(getPercentageDiff(lastRun.distance, secondLastRun.distance))
      );
      setStateDiff(lastRun.distance >= secondLastRun.distance ? 1 : -1);
    }
  }, [props.allRuns]);

  return (
    <ButtonBase className={classes.buttonBase} onClick={handleDisplayClick}>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Grid className={classes.gridOuter} container spacing={3}>
            <Grid item className={classes.gridItem}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Distance
              </Typography>
              <Typography
                className={classes.number}
                color="textPrimary"
                variant="h4"
              >
                {parseFloat(currValue).toFixed(2)} km
              </Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <DistanceIcon />
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
              Since last {display} ({parseFloat(prevValue).toFixed(2)} km)
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
