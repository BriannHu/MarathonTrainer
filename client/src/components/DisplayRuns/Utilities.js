export function getInfoDisplay(string, type) {
  switch (type) {
    case "date":
      return getDateDisplay(string.substring(0, 10));
    case "distance":
      return getDistanceDisplay(string);
    case "duration":
      return getDurationDisplay(string);
    case "pace":
      return getPaceDisplay();
    default:
      return string;
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
  const totalKm = (parseInt(distance) / 1000).toFixed(2);
  return `${totalKm} km`;
}

// rounds input duration (s) to nearest 2 decimal place KM
function getDurationDisplay(duration) {
  const hours = Math.floor(duration / 3600);
  const rem1 = duration % 3600;
  const mins = Math.floor(rem1 / 60);
  var secs = rem1 % 60;
  if (secs < 10) secs = `0${secs}`;
  return hours > 0 ? `${hours}:${mins}:${secs}` : `${mins}:${secs}`;
}

// input distance (m) and input duration (s)
export function getPaceDisplay(distance, duration) {
  var mins = Math.floor(duration / 60);
  var secs = duration % 60;
  if (secs / 60 === 0) secs = 60;
  if (mins === 0) mins = 1;
  const time = mins * (secs / 60);
  const km = (parseInt(distance) / 1000).toFixed(2);
  const res = time / km;

  const pace_mins = res.toString().split(".")[0];
  const pace_secs_perc = res - pace_mins;
  const pace_secs = Math.floor(pace_secs_perc * 60);
  return `${pace_mins}'${pace_secs}"`;
}
