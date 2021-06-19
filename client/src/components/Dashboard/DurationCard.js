import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { green, lightBlue } from "@material-ui/core/colors";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DurationIcon from "@material-ui/icons/UpdateOutlined";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: green[700],
  },
  arrowText: {
    color: green[700],
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
  cardContent: {
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  root: {
    minWidth: 275,
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
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function DurationCard() {
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
              Duration
            </Typography>
            <Typography
              className={classes.number}
              color="textPrimary"
              variant="h4"
            >
              7:12:30 hrs
            </Typography>
          </Grid>

          <Grid item>
            <Avatar className={classes.avatar}>
              <DurationIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box className={classes.box}>
          <ArrowUpwardIcon className={classes.arrow} />
          <Typography className={classes.arrowText} variant="body2">
            23%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last week
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
