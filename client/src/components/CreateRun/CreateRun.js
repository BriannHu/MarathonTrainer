import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles({
  form: {
    marginTop: "1rem",
  },
  formControl: {
    display: "block",
    margin: "1rem 0.5rem",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: "1rem",
  },
  switch: {
    margin: "1rem -0.5rem",
  },
});

export default function CreateRun2() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pace, setPace] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users/").then((response) => {
      if (response.data.length > 0) {
        setUsers(response.data.map((user) => user.username));
      }
    });
  }, [users]);

  useEffect(() => {
    setPace(duration / distance);
  }, [distance, duration]);

  const onSubmit = (e) => {
    e.preventDefault();

    const run = { name, date, distance, duration, pace };

    console.log(run);

    axios
      .post("http://localhost:5000/runs/add", run)
      .then((res) => console.log(res.data));
  };

  return (
    <div>
      <h3>Add Run</h3>
      <form className={classes.form} onSubmit={onSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Name
          </InputLabel>{" "}
          <Select
            native
            value={name}
            onChange={(e) => setName(e.target.value)}
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
          >
            <option aria-label="None" value="" />
            {users.map((name) => {
              return (
                <option key={name} value={name}>
                  {name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="outlined"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="standard-number"
            label="Distance"
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="standard-number"
            label="Duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="standard-number"
            label="Pace"
            value={pace}
            InputProps={{
              readOnly: true,
            }}
          />
        </FormControl>
        <Button type="submit" variant="outlined" color="primary">
          Add Entry
        </Button>
      </form>
    </div>
  );
}
