export function getInfoDisplay(run, name) {
  switch (name) {
    case "date":
      return getDateDisplay(run[name].substring(0, 10));
    case "distance":
      return getDistanceDisplay(run[name]);
    case "duration":
      return getDurationDisplay(run["hours"], run["minutes"], run["seconds"]);
    case "pace":
      return getPaceDisplay(run["paceMinutes"], run["paceSeconds"]);
    default:
      return run[name];
  }
}

function getDateDisplay(date) {
  const months = {
    1: "JAN",
    2: "FEB",
    3: "MAR",
    4: "APR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AUG",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC",
  };
  const res = date.split("-");
  return `${months[parseInt(res[1])]} ${res[2]} ${res[0]}`;
}

// rounds input distance (m) to nearest 2 decimal place KM
// TODO: switch between km and miles
function getDistanceDisplay(distance) {
  return `${distance} km`;
}

// rounds input duration (s) to nearest 2 decimal place KM
export function getDurationDisplay(hours, minutes, seconds) {
  const mins = (minutes < 10 ? "0" : "") + minutes;
  const secs = (seconds < 10 ? "0" : "") + seconds;
  return hours > 0 ? `${hours}:${mins}:${secs}` : `${mins}:${secs}`;
}

// input distance (m) and input duration (s)
export function getPaceDisplay(paceMinutes, paceSeconds) {
  return `${paceMinutes || 0}'${paceSeconds || 0}"`;
}
