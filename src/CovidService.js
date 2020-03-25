import moment from "moment";

String.prototype.format = function() {
  var i = 0,
    args = arguments;
  return this.replace(/{}/g, function() {
    return typeof args[i] != "undefined" ? args[i++] : "";
  });
};
Array.prototype.last = function() {
  return this[this.length - 1];
};

const config = {
  days: 3,
  timeseries:
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_{}_global.csv"
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
    let last = moment(new Date(array[0].last()));
    for (let i = 0; i < config.days; i++) {
      last = last.add(1, "days");
      labels.push(last.format("YYYY-MM-DD"));
    }
    array = array.slice(1);

    // grupo US y CHINA
    ["China", "US"].forEach(name => {
      let result = array
        .filter(it => it[1] === name)
        .reduce((a, b) => {
          let c = [...b];
          if (a.length === 0) {
            return c;
          }
          c[0] = "SUMATORIA";
          for (let i = 4; i < b.length; i++) {
            c[i] = parseInt(c[i]) + parseInt(a[i]);
          }
          return c;
        }, []);
      array.unshift(result);
    });
    //grupo UE

    let result = array
      .filter(it =>
        [
          "Spain",
          "France",
          "Italy",
          "Germany",
          "Portugal",
          "Austria",
          "Belgium",
          "Netherlands"
        ].includes(it[1])
      )
      .reduce((a, b) => {
        let c = [...b];
        if (a.length === 0) {
          return c;
        }
        c[1] = "UE - Parcial";
        c[0] = "SUMATORIA";
        for (let i = 4; i < b.length; i++) {
          c[i] = parseInt(c[i]) + parseInt(a[i]);
        }
        return c;
      }, []);
    array.unshift(result);

    let values = array.map(line => ({
      label: line[1] + (line[0] ? " / " + line[0] : ""),
      checked: false,
      last: line.last(),
      values: line.slice(4).map(it => parseInt(it)),
      proyections: []
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

let createProyections = function(values) {
  let result = values.map(it => it);
  let index = result.length - config.days;
  let last = result.last();
  for (let i = 0; i < config.days; i++) {
    let diff = result[index + i] - result[index + i - 1];
    last = last + diff;
    result.push(last);
  }
  return result;
};
export { fetchTimeLine, createProyections };
