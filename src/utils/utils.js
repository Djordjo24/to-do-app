export function setMoment(date) {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hour < 10 ? "0" + hour : hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds} ${hour < 12 ? "AM" : "PM"}, ${
    month < 10 ? "0" + month : month
  }/${day < 10 ? "0" + day : day}/${year}`;
}

export function filterData(data, taskStatus) {
  if (taskStatus === "all") {
    return data;
  }
  return data.filter((obj) => obj.status === taskStatus);
}
