import moment from "moment";

String.prototype.format = function() {
  var i = 0,
    args = arguments;
  return this.replace(/{}/g, function() {
    return typeof args[i] != "undefined" ? args[i++] : "";
  });
};
Array.prototype.last = function(index = 1) {
  return this[this.length - index];
};

const config = {
  before: 5,
  after: 25,
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
    for (let i = 0; i < config.after; i++) {
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
          c[0] = "SUMATORIA";
          if (a.length === 0) {
            return c;
          }
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
  error = error
    ? error
    : e => {
        console.warn("Error:", e);
      };
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

let createWeekRegression = function(values) {
  let result = values.map(it => it);
  let init = result.length - config.before;
  let averange = 0;
  for (let i = init; i < result.length; i++) {
    let diff = result[i] - result[i - 1];
    averange = averange + diff;
  }
  averange = averange / config.before;
  for (let i = 0; i < init; i++) {
    result[i] = undefined;
  }
  let point = values.last();
  let index = result.length - 1;
  for (let i = 0; i < config.after; i++) {
    result[index - i] = point - averange * i;
    result[index + i] = point + averange * i;
  }
  return result;
};

let createRegression = function(values, init, fnRegression) {
  let length = values.length;
  console.log("=", init, length, fnRegression);
  let x = 0;
  let xx = [];
  let yy = [];
  for (var i = init; i < length; ++i) {
    xx.push(x++);
    yy.push(values[i]);
  }
  const regression = new fnRegression(xx, yy);
  let result = values.map(it => it);
  let index = result.length - 1;
  for (let i = 0; i < init; i++) {
    result[i] = undefined;
  }
  for (let i = 0; i < config.after; i++) {
    result[index + i] = regression.predict(x + i);
    result[index - i] = regression.predict(x - i);
  }
  return result;
};

let createLinearRegression = function(values) {
  let ML = window.xML;
  let init = values.length - config.before;
  //let init = values.findIndex(it => it > 0);
  return createRegression(values, init, ML.SimpleLinearRegression);
};

let createExponentialRegression = function(values) {
  let ML = window.xML;
  let init = values.findIndex(it => it > 0);
  return createRegression(values, init, ML.ExponentialRegression);
};
export {
  fetchTimeLine,
  createWeekRegression,
  createLinearRegression,
  createExponentialRegression
};
