import moment from "moment";

String.prototype.format = function() {
  var i = 0,
    args = arguments;
  return this.replace(/{}/g, function() {
    return typeof args[i] != "undefined" ? args[i++] : "";
  });
};

const config = {
  timeseries:
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-{}.csv"
};

const mapper = {
  csvToMatrix: function(csv) {
    return csv.split("\n").map(it => it.split(","));
  },
  matrixToModel: function(array) {
    let labels = array[0]
      .slice(4)
      .map(it => new Date(it))
      .map(it => moment(it))
      .map(it => it.format("YYYY-MM-DD"));
    let values = array.slice(1);
    values = values.map(line => ({
      label: line[1] + (line[0] ? " / " + line[0] : ""),
      checked: false,
      values: line.slice(4)
    }));

    return {
      labels,
      values
    };
  }
};

let fetchTimeLine = function(type, success, error) {
  success = success ? success : () => {};
  error = error ? error : () => {};
  let result = {
    title: "TimeLine for " + type,
    url: config.timeseries.format(type)
  };
  fetch(result.url)
    .then(response => response.text())
    .then(text => mapper.csvToMatrix(text))
    .then(matrix => mapper.matrixToModel(matrix))
    .then(model => {
      return { ...result, ...model };
    })
    .then(success)
    .catch(error);
};
//let data = {
//  confirmed: service.getTimeLineModel("Confirmed"),
//  deaths: service.getTimeLineModel("Deaths"),
//  recovered: service.getTimeLineModel("Recovered")
//};
//console.log("data:::::::::::", data);

export { fetchTimeLine };
