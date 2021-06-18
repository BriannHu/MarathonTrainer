import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

import axios from "axios";

const useStyles = makeStyles({
  icon1: { marginRight: "1rem" },
  icon2: { marginLeft: "1rem" },
  link: {
    color: "black !important",
  },

  selectTableCell: {
    width: 150,
  },
  table: {
    minWidth: 650,
  },
});

const createData = (id, name, date, distance, duration, pace) => ({
  id,
  name,
  date,
  distance,
  duration,
  pace,
  isEditMode: false,
});

const CustomTableCell = ({ run, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = run;

  return (
    <TableCell align="right" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={run[name]}
          name={name}
          onChange={(e) => onChange(e, run)}
          className={classes.input}
        />
      ) : name === "date" ? (
        String(run[name]).substring(0, 10)
      ) : (
        run[name]
      )}
    </TableCell>
  );
};

export default function DisplayAllRuns() {
  const classes = useStyles();
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/runs/")
      .then((response) => {
        response.data.map((run) =>
          setRuns((old) => [
            ...old,
            createData(
              run._id,
              run.name,
              run.date,
              run.distance,
              run.duration,
              run.pace
            ),
          ])
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onToggleEditMode = (id) => {
    setRuns((state) => {
      return runs.map((run) => {
        if (run.id === id) {
          return { ...run, isEditMode: !run.isEditMode };
        }
        return run;
      });
    });
  };

  const [previous, setPrevious] = React.useState({});

  const onChange = (e, run) => {
    if (!previous[run.id]) {
      setPrevious((state) => ({ ...state, [run.id]: run }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = run;
    const newRuns = runs.map((run) => {
      if (run.id === id) {
        return { ...run, [name]: value };
      }
      return run;
    });
    setRuns(newRuns);
  };

  const onRevert = (id) => {
    const newRuns = runs.map((run) => {
      if (run.id === id) {
        return previous[id] ? previous[id] : run;
      }
      return run;
    });
    setRuns(newRuns);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  const deleteRun = (id) => {
    axios
      .delete("http://localhost:5000/runs/" + id)
      .then((res) => console.log(res.data));
    setRuns(runs.filter((el) => el.id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Distance&nbsp;(m)</TableCell>
            <TableCell align="right">Duration&nbsp;(s)</TableCell>
            <TableCell align="right">Pace&nbsp;(m/s)</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {runs.map((run) => {
            return (
              <TableRow key={run._id}>
                <TableCell className={classes.selectTableCell}>
                  {run.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => onToggleEditMode(run.id)}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        aria-label="revert"
                        onClick={() => onRevert(run.id)}
                      >
                        <RevertIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        aria-label="edit"
                        onClick={() => onToggleEditMode(run.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deleteRun(run.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
                <CustomTableCell {...{ run, name: "name", onChange }} />
                <CustomTableCell {...{ run, name: "date", onChange }} />
                <CustomTableCell {...{ run, name: "distance", onChange }} />
                <CustomTableCell {...{ run, name: "duration", onChange }} />
                <CustomTableCell {...{ run, name: "pace", onChange }} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
