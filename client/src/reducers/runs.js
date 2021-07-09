const runReducer = (runs = [], action) => {
  switch (action.type) {
    case "CREATE":
      return [...runs, action.payload];
    case "FETCH_ALL":
      return action.payload;
    case "UPDATE":
      return runs.map((run) =>
        run._id === action.payload._id ? action.payload : run
      );
    default:
      return runs;
  }
};

export default runReducer;
