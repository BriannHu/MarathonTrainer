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
