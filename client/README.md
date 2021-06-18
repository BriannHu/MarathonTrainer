<TableCell align="center">
                  <Link to={"/edit/" + run._id} className={classes.link}>
                    <EditIcon className={classes.icon1} type="button" />
                  </Link>
                  <DeleteIcon
                    className={classes.icon2}
                    type="button"
                    onClick={() => {
                      deleteRun(run._id);
                    }}
                  />
                </TableCell>
<TableCell align="right">{run.date.substring(0, 10)}</TableCell>
                <TableCell align="right">{run.distance}</TableCell>
                <TableCell align="right">{run.duration}</TableCell>
                <TableCell align="right">{run.pace}</TableCell>

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

{run.isEditMode ? (
<>
<IconButton
aria-label="done"
onClick={() => onToggleEditMode(run, run.id)} >
<DoneIcon />
</IconButton>
<IconButton
aria-label="revert"
onClick={() => onRevert(run.id)} >
<RevertIcon />
</IconButton>
</>
) : (
<>
<IconButton
aria-label="edit"
onClick={() => onToggleEditMode(run, run.id)} >
<EditIcon />
</IconButton>
<IconButton
aria-label="delete"
onClick={() => deleteRun(run.id)} >
<DeleteIcon />
</IconButton>
</>
)}

clsx(classes.root, {
[classes.highlight]: numSelected > 0,
})}
