import React from "react";
import { Line } from "react-chartjs-2";
import {
  createWeekRegression,
  createLinearRegression,
  createExponentialRegression
} from "./CovidService";
//const data = {
//  labels: ["January", "February", "March", "April", "May", "June", "July"],
//  datasets: [
//    {
//      label: "My First dataset",
//      fill: false,
//      lineTension: 0.1,
//      backgroundColor: "rgba(75,192,192,0.4)",
//      borderColor: "rgba(75,192,192,1)",
//      borderCapStyle: "butt",
//      borderDash: [],
//      borderDashOffset: 0.0,
//      borderJoinStyle: "miter",
//      pointBorderColor: "rgba(75,192,192,1)",
//      pointBackgroundColor: "#fff",
//      pointBorderWidth: 1,
//      pointHoverRadius: 5,
//      pointHoverBackgroundColor: "rgba(75,192,192,1)",
//      pointHoverBorderColor: "rgba(220,220,220,1)",
//      pointHoverBorderWidth: 2,
//      pointRadius: 1,
//      pointHitRadius: 10,
//      data: [65, 59, 80, 81, 56, 55, 40]
//    }
//  ]
//};
const colors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#b29dd9",
  "#85a8ba",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#fe6b64"
];

let mapper = {
  createNewList: function(it, attr, fnList) {
    if (!it[attr] || it[attr].length === 0) {
      it[attr] = fnList(it.values);
    }
    return it;
  },
  createDataset: function(title, it, i, attr, start, end) {
    let values = it[attr];
    if (!values) {
      values = [];
    }
    if (values.slice) {
      values = values.slice(start, end);
    }
    let sw = title && title.includes("-");
    return {
      label: it.label + title,
      data: values,
      fill: false,
      pointRadius: sw ? 1 : 3,
      borderDash: sw ? [5, 5] : [],
      borderWidth: sw ? 2 : 3,
      borderColor: colors[i % colors.length],
      backgroundColor: colors[i % colors.length]
    };
  },
  slice: function(it, start) {
    return {
      ...it,
      values: it.values.slice(start)
    };
  }
};

function CovidGraph({ values, times, from, to }) {
  let start = 0;
  let end = values.length;
  if (from) {
    start = times.indexOf(from);
  }
  if (to) {
    end = times.indexOf(to);
  }
  console.log("-->", times, start, end);

  let data = {
    labels: times.slice(start, end),
    datasets: []
  };
  values
    .filter(it => it.checked)
    .map(it => {
      it = mapper.createNewList(it, "linear", createWeekRegression);
      it = mapper.createNewList(it, "linearA", createLinearRegression);
      it = mapper.createNewList(it, "linearB", createExponentialRegression);
      return it;
    })
    .forEach((it, i) => {
      data.datasets.push(mapper.createDataset("", it, i, "values", start, end));
      data.datasets.push(
        mapper.createDataset("-Week", it, 10 + i, "linear", start, end)
      );
      data.datasets.push(
        mapper.createDataset("-Linear", it, 20 + i, "linearA", start, end)
      );
      data.datasets.push(
        mapper.createDataset("-Exponential", it, 30 + i, "linearB", start, end)
      );
    });
  return (
    <div>
      <Line data={data} />
    </div>
  );
}

export default CovidGraph;
