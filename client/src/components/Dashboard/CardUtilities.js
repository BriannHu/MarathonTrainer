export function getCumulativeDistance(runs) {
  var totalDistance = 0;
  runs.forEach((run) => {
    totalDistance += run.distance;
  });
  return totalDistance;
}

export function getCumulativeDuration(runs) {
  var totalHours = 0;
  var totalMinutes = 0;
  var totalSeconds = 0;
  runs.forEach((run) => {
    totalHours += run.hours;
    totalMinutes += run.minutes;
    totalSeconds += run.seconds;
  });
  totalMinutes += Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;
  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;
  const mins = (totalMinutes < 10 ? "0" : "") + totalMinutes;
  const secs = (totalSeconds < 10 ? "0" : "") + totalSeconds;
  return `${totalHours}:${mins}:${secs}`;
}

// used for finding percent difference between two paces
export function getSecondsFromPace(pace) {
  // pace in form `${pace_mins}'${pace_secs}"`
  const trimmedPace = pace.substring(0, pace.length - 1);
  const splitTrimmedPace = trimmedPace.split("'");
  var mins = parseInt(splitTrimmedPace[0]);
  var secs = parseInt(splitTrimmedPace[1]);
  return mins * 60 + secs;
}

export function getTotalRunPace(distance, duration) {
  // duration in form `${totalHours}:${mins}:${secs}`
  const times = duration.split(":");
  var hrs = parseInt(times[0]);
  var mins = parseInt(times[1]);
  var secs = parseInt(times[2]);
  mins = parseInt(mins) + parseInt(hrs * 60);
  var pace_mins = Math.trunc(mins / distance);
  var frac_secs = ((mins / distance) % 1) + secs / 60 / distance;
  var pace_secs = Math.round(frac_secs * 60);
  return `${pace_mins || 0}'${
    pace_secs < 10 ? "0" + pace_secs : pace_secs || "00"
  }"`;
}

export function getRunPace(run) {
  return `${run.paceMinutes}'${
    run.paceSeconds < 10 ? "0" + run.paceSeconds : run.paceSeconds
  }"`;
}

export function getRunDuration(run) {
  const hours = run.hours;
  const minutes = run.minutes;
  const seconds = run.seconds;
  const mins = (minutes < 10 ? "0" : "") + minutes;
  const secs = (seconds < 10 ? "0" : "") + seconds;
  return hours > 0 ? `${hours}:${mins}:${secs}` : `${mins}:${secs}`;
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

export function getSeconds(duration) {
  const times = duration.split(":");
  const hrs = times[0];
  const mins = times[1];
  const secs = times[2];
  const result = parseInt(hrs) * 3600 + parseInt(mins) * 60 + parseInt(secs);
  return result;
}

export function getPercentageDiff(thisTime, lastTime) {
  return 100 * Math.abs((thisTime - lastTime) / ((thisTime + lastTime) / 2));
}
