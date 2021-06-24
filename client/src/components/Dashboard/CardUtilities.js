export function getCumulativeDistance(runs) {
  var totalDistance = 0;
  runs.forEach((run) => {
    totalDistance += run.distance;
  });
  return totalDistance;
}

export function getLastMonthRuns(runs) {
  const lastMonthRuns = [];
  const DAYS = 31; // 31 days to subtract
  const currentDate = new Date();
  const firstDate = new Date(
    currentDate.getTime() - DAYS * 24 * 60 * 60 * 1000
  );
  // NOTE: time is not checked but doesn't matter since it's only past week
  let startDate = firstDate.setHours(0, 0, 0, 0);
  let endDate = currentDate.setHours(0, 0, 0, 0);
  runs.forEach((run) => {
    const currentRunDate = new Date(run.date).setHours(0, 0, 0, 0);
    if (currentRunDate >= startDate && currentRunDate <= endDate) {
      lastMonthRuns.push(run);
    }
  });
  return lastMonthRuns;
}

export function getSecondLastMonthRuns(runs) {
  const secondLastMonthRuns = [];
  const DAYS = 31; // 31 days to subtract
  const currentDate = new Date();
  const firstDate = new Date(
    currentDate.getTime() - DAYS * 24 * 60 * 60 * 1000
  );
  const secondDate = new Date(
    currentDate.getTime() - DAYS * 2 * 24 * 60 * 60 * 1000 // extra 2 to get week before
  );
  // NOTE: time is not checked but doesn't matter since it's only past week
  let startDate = secondDate.setHours(0, 0, 0, 0);
  let endDate = firstDate.setHours(0, 0, 0, 0);
  runs.forEach((run) => {
    const currentRunDate = new Date(run.date).setHours(0, 0, 0, 0);
    if (currentRunDate >= startDate && currentRunDate <= endDate) {
      secondLastMonthRuns.push(run);
    }
  });
  return secondLastMonthRuns;
}

export function getLastWeekRuns(runs) {
  const lastWeekRuns = [];
  const DAYS = 7; // 7 days to subtract
  const currentDate = new Date();
  const firstDate = new Date(
    currentDate.getTime() - DAYS * 24 * 60 * 60 * 1000
  );
  // NOTE: time is not checked but doesn't matter since it's only past week
  let startDate = firstDate.setHours(0, 0, 0, 0);
  let endDate = currentDate.setHours(0, 0, 0, 0);
  runs.forEach((run) => {
    const currentRunDate = new Date(run.date).setHours(0, 0, 0, 0);
    if (currentRunDate >= startDate && currentRunDate <= endDate) {
      lastWeekRuns.push(run);
    }
  });
  return lastWeekRuns;
}

export function getSecondLastWeekRuns(runs) {
  const secondLastWeekRuns = [];
  const DAYS = 7; // 7 days to subtract
  const currentDate = new Date();
  const firstDate = new Date(
    currentDate.getTime() - DAYS * 24 * 60 * 60 * 1000
  );
  const secondDate = new Date(
    currentDate.getTime() - DAYS * 2 * 24 * 60 * 60 * 1000 // extra 2 to get week before
  );
  // NOTE: time is not checked but doesn't matter since it's only past week
  let startDate = secondDate.setHours(0, 0, 0, 0);
  let endDate = firstDate.setHours(0, 0, 0, 0);
  runs.forEach((run) => {
    const currentRunDate = new Date(run.date).setHours(0, 0, 0, 0);
    if (currentRunDate >= startDate && currentRunDate <= endDate) {
      secondLastWeekRuns.push(run);
    }
  });
  return secondLastWeekRuns;
}

export function getLastRun(runs) {
  const sortedRunsByDate = runs
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return sortedRunsByDate[0];
}

export function getSecondLastRun(runs) {
  const sortedRunsByDate = runs
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return sortedRunsByDate[1];
}

export function getPercentageDiff(thisTime, lastTime) {
  return 100 * Math.abs((thisTime - lastTime) / ((thisTime + lastTime) / 2));
}
