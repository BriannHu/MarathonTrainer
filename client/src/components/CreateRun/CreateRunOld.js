import React, { Component } from "react";
import axios from "axios";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = (theme) => ({
  form: {
    marginTop: "1rem",
  },
  formControl: {
    display: "block",
    margin: "1rem 0.5rem",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  switch: {
    margin: "1rem -0.5rem",
  },
});

class CreateRun extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDistance = this.onChangeDistance.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangePace = this.onChangePace.bind(this);
    this.onChangeIndoor = this.onChangeIndoor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      date: new Date(),
      distance: 0,
      duration: 0,
      pace: 0,
      indoor: false,
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onChangeDistance(e) {
    this.setState(
      {
        distance: e.target.value,
      },
      () => {
        this.setState({
          pace: this.state.distance / this.state.duration,
        });
      }
    );
  }

  onChangeDuration(e) {
    this.setState(
      {
        duration: e.target.value,
      },
      () => {
        this.setState({
          pace: this.state.distance / this.state.duration,
        });
      }
    );
  }

  onChangePace(e) {
    this.setState({
      pace: e.target.value,
    });
  }

  onChangeIndoor(e) {
    this.setState({
      indoor: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const run = {
      name: this.state.name,
      date: this.state.date,
      distance: this.state.distance,
      duration: this.state.duration,
      pace: this.state.pace,
      indoor: this.state.indoor,
    };

    console.log(run);

    axios
      .post("http://localhost:5000/runs/add", run)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h3>Add Run</h3>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Name
            </InputLabel>{" "}
            <Select
              native
              value={this.state.name}
              onChange={this.onChangeName}
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
            >
              <option aria-label="None" value="" />
              {this.state.users.map((name) => {
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
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={this.state.date}
                onChange={this.onChangeDate}
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
              value={this.state.distance}
              onChange={this.onChangeDistance}
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
              value={this.state.duration}
              onChange={this.onChangeDuration}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-number"
              label="Pace"
              value={this.state.pace}
              onChange={this.onChangePace}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Indoor</InputLabel>{" "}
            <Switch
              className={classes.switch}
              value={this.state.indoor}
              onChange={this.onChangeIndoor}
              color="primary"
            />
          </FormControl>
          <Button type="submit" variant="outlined" color="primary">
            Add Entry
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(useStyles)(CreateRun);
