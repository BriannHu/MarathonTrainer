import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: { light: green[300], main: green[500], dark: green[700] },
  },
});

export default function CustomCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper style={{ overflow: "hidden" }}>
          <Calendar date={selectedDate} onChange={handleDateChange} />
        </Paper>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}
