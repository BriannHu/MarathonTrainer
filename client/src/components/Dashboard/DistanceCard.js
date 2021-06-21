import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { red, deepOrange } from "@material-ui/core/colors";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DistanceIcon from "@material-ui/icons/RoomOutlined";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: red[700],
  },
  arrowText: {
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
}));

export default function DistanceCard() {
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
              Distance
            </Typography>
            <Typography
              className={classes.number}
              color="textPrimary"
              variant="h4"
            >
              43.41 km
            </Typography>
          </Grid>

          <Grid item>
            <Avatar className={classes.avatar}>
              <DistanceIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box className={classes.box}>
          <ArrowDownwardIcon className={classes.arrow} />
          <Typography className={classes.arrowText} variant="body2">
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last week
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
