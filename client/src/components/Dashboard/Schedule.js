import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 500,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const currentDate = "2018-11-01";
const schedulerData = [
  {
    startDate: "2018-11-01T09:45",
    endDate: "2018-11-01T11:00",
    title: "Meeting",
  },
  {
    startDate: "2018-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "Go to a gym",
  },
];

export default function Schedule() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          Schedule
        </Typography>
      </CardContent>
      <Scheduler data={schedulerData}>
        <ViewState currentDate={currentDate} />
        <DayView today startDayHour={9} endDayHour={19} />
        <Appointments />
      </Scheduler>
    </Card>
  );
}
