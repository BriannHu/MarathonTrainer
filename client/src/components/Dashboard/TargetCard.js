import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { indigo, green } from "@material-ui/core/colors";
import LinearProgress from "@material-ui/core/LinearProgress";

import TargetIcon from "@material-ui/icons/TrackChanges";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "white",
  },
  barColorPrimary: {
    backgroundColor: green[600],
  },
  barText: {
    color: "white",
  },
  box: {
    paddingTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: 12,
    },
  },
  colorPrimary: {
    backgroundColor: "white",
  },
  root: {
    backgroundColor: indigo[500],
    minWidth: 275,
  },
  gridOuter: {
    justifyContent: "space-between",
  },
  number: {
    color: "white",
    fontWeight: 600,
  },
  progress: {
    marginTop: theme.spacing(1),
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export default function TargetCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Grid className={classes.gridOuter} container spacing={3}>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Weekly Goal
            </Typography>
            <Typography
              className={classes.number}
              color="textPrimary"
              variant="h4"
            >
              86%
            </Typography>
          </Grid>

          <Grid item>
            <Avatar className={classes.avatar}>
              <TargetIcon style={{ color: indigo[500] }} />
            </Avatar>
          </Grid>
        </Grid>
        <Box>
          <LinearProgress
            className={classes.progress}
            classes={{
              colorPrimary: classes.colorPrimary,
              barColorPrimary: classes.barColorPrimary,
            }}
            value={86}
            variant="determinate"
          />

          <Typography className={classes.barText} variant="caption">
            Target: 50km
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
