const runReducer = (runs = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...runs, action.payload];
    default:
      return runs;
  }
};

export default runReducer;
