import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";

import { colors, useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontWeight: 700,
    textTransform: "uppercase",
  },
  chart: {},
  card: { height: 500 },
  title: {
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  gridOuter: {
    justifyContent: "space-between",
  },
}));

export default function Chart() {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = useState({});
  const [week, setWeek] = useState(true);
  const [points, setPoints] = useState(3); // max number of data points in chart

  function getData() {
    axios.get("http://localhost:5000/runs/").then((response) => {
      const labels = [];
      const distances = [];
      const durations = [];
      const paces = [];
      const END_IDX = Math.min(response.data.length, points);
      response.data
        .reverse() // reverse to get most recent first
        .slice(0, END_IDX)
        .forEach((run) => {
          labels.push(run.date.substring(0, 10));
          distances.push(run.distance);
          durations.push(run.duration);
          paces.push(run.pace);
        });
      setData({
        labels: labels.reverse(),
        datasets: [
          {
            type: "bar",
            label: "Distance",
            backgroundColor: colors.deepOrange[500],
            borderColor: colors.deepOrange[500],
            borderWidth: 2,
            data: distances.reverse(),
            yAxisID: "y-axis-1",
          },
          {
            type: "bar",
            label: "Duration",
            backgroundColor: colors.lightBlue[500],
            borderColor: colors.lightBlue[500],
            data: durations.reverse(),
            borderWidth: 2,
            yAxisID: "y-axis-1",
          },
          {
            type: "bar",
            label: "Pace",
            backgroundColor: colors.purple[500],
            borderColor: colors.purple[500],
            fill: false,
            data: paces.reverse(),
            borderWidth: 2,
          },
        ],
      });
    });
  }

  const options = {
    gridLines: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-1",
        },
      ],
    },
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [points]);

  const handleWeeklyClick = () => {
    setWeek(true);
    setPoints(3);
  };

  const handleMonthlyClick = () => {
    setWeek(false);
    setPoints(5);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid className={classes.gridOuter} container spacing={3}>
          <Grid item>
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
            >
              Overview
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              color="primary"
              variant={week ? "contained" : "outlined"}
              onClick={handleWeeklyClick}
            >
              Weekly
            </Button>
            <Button
              className={classes.button}
              color="primary"
              variant={!week ? "contained" : "outlined"}
              onClick={handleMonthlyClick}
            >
              Monthly
            </Button>
          </Grid>
        </Grid>
        <Bar className={classes.chart} data={data} options={options} />
      </CardContent>
    </Card>
  );
}
