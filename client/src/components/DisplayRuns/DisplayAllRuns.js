import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { lighten, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import ExportIcon from "@material-ui/icons/OpenInNewOutlined";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

import axios from "axios";

import { getInfoDisplay } from "./Utilities";

const useStyles = makeStyles({
  editIcon: {
    marginLeft: "2.75rem",
    marginRight: 0,
  },
  header: {
    backgroundColor: "#e8eafc",
    height: 50,
  },
  headerCellLabel: {
    color: "#333333",
    fontWeight: 600,
  },
  icon1: { marginRight: "1rem" },
  icon2: { marginLeft: "1rem" },
  link: {
    color: "black !important",
  },
  selectTableCell: {
    width: 130,
  },
  table: {
    minWidth: 800,
  },
  tableCell: {},
  table_row: {
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "rgba(232, 234, 252, 0.5)",
      "& > .MuiTableCell-root": {
        color: "black",
      },
    },
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
    disablePadding: false,
    label: "Name",
  },
  { id: "date", numeric: true, disablePadding: false, label: "Date" },
  {
    id: "distance",
    numeric: true,
    disablePadding: false,
    label: "Distance",
  },
  {
    id: "duration",
    numeric: true,
    disablePadding: false,
    label: "Duration",
  },
  { id: "pace", numeric: true, disablePadding: false, label: "Pace" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    numSelected,
    onSelectAllClick,
    order,
    orderBy,
    onRequestSort,
    rowCount,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.header}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            color="primary"
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all runs" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.headerCell}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              className={classes.headerCellLabel}
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
        <TableCell className={classes.headerCell}></TableCell>
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

const CustomTableCell = ({ run, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = run;

  return (
    <TableCell align="right" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          disabled={name !== "name"}
          value={getInfoDisplay(run, name)}
          name={name}
          onChange={(e) => onChange(e, run)}
          className={classes.input}
        />
      ) : (
        getInfoDisplay(run, name)
      )}
    </TableCell>
  );
};

//------------------- FOR SELECT/DELETE FUNCTIONALITY -------------------
const useToolbarStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: "0 3rem 0 0.5rem",
    minWidth: 250,
  },
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.info.main,
          backgroundColor: lighten(theme.palette.info.light, 0.9),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.info.dark,
        },
  title: {
    fontSize: 14,
    fontWeight: 700,
    flex: "1 1 auto",
    marginLeft: theme.spacing(-2),
    marginTop: theme.spacing(-2),
    textTransform: "uppercase",
  },
}));

function exportRuns() {
  axios.get("http://localhost:5000/exports/").then((response) => {
    const filename = response.data; // returns end of url in form of csv-xxxx.csv, x are random numbers
    axios.get("http://localhost:5000/exports/" + filename).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    });
  });
}

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, handleRunDelete, selected, setSelected } = props;
  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        color="textPrimary"
        id="tableTitle"
        component="div"
      >
        Summary
      </Typography>
      <Tooltip title="Export All">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<ExportIcon />}
          onClick={() => exportRuns()}
        >
          Export
        </Button>
      </Tooltip>

      {numSelected > 0 ? (
        <Tooltip title="Delete Selected">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => {
              handleRunDelete(selected);
              setSelected([]);
            }}
          >
            Delete
          </Button>
        </Tooltip>
      ) : (
        <Button
          disabled
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const createData = (run) => ({
  // pre-emptively set MongoDB ID
  // can add multiple runs and select individually
  // otherwise have to refresh page to load runs from MongoDB for _id's
  ...run,
  isEditMode: false,
});

export default function DisplayAllRuns(props) {
  const classes = useStyles();
  const runs = useSelector((state) => state.runs);
  // console.log(runs.map((run) => createData(run)));
  const [currRuns, setCurrRuns] = useState(runs.map((run) => createData(run)));

  // stores runs to be mapped to rows, pulled from db
  // const [runs, setRuns] = useState([]);

  // stores history of runs before change
  // triggers when edit button of run is clicked
  const [previous, setPrevious] = useState({});

  // sets ordering of table
  // default is ascending by date
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("date");

  // sets current selected row(s)
  const [selected, setSelected] = useState([]);

  // sets pagination options
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setCurrRuns(runs.map((run) => createData(run)));
  }, [runs]);

  const onToggleEditMode = (run, id) => {
    if (!previous[id]) {
      setPrevious((state) => ({ ...state, [id]: run }));
    } else {
      setPrevious((state) => {
        delete state[id];
        return state;
      });
    }
    setCurrRuns((state) => {
      return currRuns.map((run) => {
        if (run._id === id) {
          return { ...run, isEditMode: !run.isEditMode };
        }
        return run;
      });
    });
  };

  const onChange = (e, run) => {
    if (!previous[run._id]) {
      setPrevious((state) => ({ ...state, [run._id]: run }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { _id } = run;
    const newRuns = currRuns.map((run) => {
      if (run._id === _id) {
        return { ...run, [name]: value };
      }
      return run;
    });
    setCurrRuns(newRuns);
  };

  const onRevert = (id) => {
    const newRuns = currRuns.map((run) => {
      if (run._id === id) {
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
    setCurrRuns(newRuns);
  };

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = currRuns.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelectClick = (e, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, currRuns.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper} elevation={2}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        selected={selected}
        setSelected={setSelected}
        handleRunDelete={props.handleRunDelete}
        // setRuns={setRuns}
        // runs={runs}
      />
      <TableContainer>
        <Table className={classes.table} aria-label="data-table" size="small">
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={currRuns.length}
          />
          <TableBody>
            {stableSort(currRuns, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((run, index) => {
                const isItemSelected = isSelected(run._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    classes={{ root: classes.table_row }}
                    key={run._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={(e) => handleSelectClick(e, run._id)}
                      />
                    </TableCell>
                    <CustomTableCell {...{ run, name: "name", onChange }} />
                    <CustomTableCell {...{ run, name: "date", onChange }} />
                    <CustomTableCell {...{ run, name: "distance", onChange }} />
                    <CustomTableCell {...{ run, name: "duration", onChange }} />
                    <CustomTableCell {...{ run, name: "pace", onChange }} />
                    <TableCell className={classes.selectTableCell}>
                      {run.isEditMode ? (
                        <>
                          <IconButton
                            aria-label="done"
                            onClick={() => onToggleEditMode(run, run._id)}
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            aria-label="revert"
                            onClick={() => onRevert(run._id)}
                          >
                            <RevertIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton aria-label="placeholder" disabled>
                            <i
                              className="far fa-edit"
                              style={{
                                fontSize: "1.2rem",
                                visibility: "hidden",
                              }}
                            ></i>
                          </IconButton>
                          <IconButton
                            aria-label="edit"
                            onClick={() => onToggleEditMode(run, run._id)}
                          >
                            <i
                              className="far fa-edit"
                              style={{ color: "#bfbfbf", fontSize: "1.5rem" }}
                            ></i>
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 61 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={currRuns.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
