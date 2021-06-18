import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
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
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
});

//------------------- FOR SORTABLE FUNCTIONALITY -------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: true,
    disablePadding: true,
    label: "Name",
  },
  { id: "date", numeric: true, disablePadding: false, label: "Date" },
  {
    id: "distance",
    numeric: true,
    disablePadding: false,
    label: "Distance (m)",
  },
  {
    id: "duration",
    numeric: true,
    disablePadding: false,
    label: "Duration (s)",
  },
  { id: "pace", numeric: true, disablePadding: false, label: "Pace (m/s)" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

//------------------- FOR EDITABLE FUNCTIONALITY -------------------

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
  // stores runs to be mapped to rows, pulled from db
  const [runs, setRuns] = useState([]);

  // stores history of runs before change
  // triggers when edit button of run is clicked
  const [previous, setPrevious] = useState({});

  // sets ordering of table
  // default is ascending by date
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");

  useEffect(() => {
    setRuns([]); // prevents more entries from being added each render
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

  const onToggleEditMode = (run, id) => {
    if (!previous[id]) {
      setPrevious((state) => ({ ...state, [id]: run }));
    } else {
      setPrevious((state) => {
        delete state[id];
        return state;
      });
    }
    setRuns((state) => {
      return runs.map((run) => {
        axios
          .post("http://localhost:5000/runs/edit/" + run.id, run)
          .then((res) => console.log(res.data));
        if (run.id === id) {
          return { ...run, isEditMode: !run.isEditMode };
        }
        return run;
      });
    });
  };

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
        return previous[id]
          ? { ...previous[id], isEditMode: !run.isEditMode }
          : { ...run, isEditMode: !run.isEditMode };
      }
      return run;
    });
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    setRuns(newRuns);
  };

  const deleteRun = (id) => {
    axios
      .delete("http://localhost:5000/runs/" + id)
      .then((res) => console.log(res.data));
    setRuns(runs.filter((el) => el.id !== id));
  };

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(runs, getComparator(order, orderBy)).map((run) => {
            return (
              <TableRow key={run._id}>
                <TableCell className={classes.selectTableCell}>
                  {run.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => onToggleEditMode(run, run.id)}
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
                        onClick={() => onToggleEditMode(run, run.id)}
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
