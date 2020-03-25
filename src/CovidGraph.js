import React from "react";
import { Line } from "react-chartjs-2";
import { createLinealProyections } from "./CovidService";
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
const colors1 = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#fdfd98",
  "#85a8ba",
  "#eee0c9",
  "#f1f0e8",
  "#b29dd9",
  "#fe6b64"
];

const colors2 = [
  "#77dd77",
  "#779ecb",
  "#90c978",
  "#83c6dd",
  "#5db1d1",
  "#98e690",
  "#ebceed",
  "#afd5aa",
  "#d9ffff"
];

function CovidGraph({ values, times, from }) {
  let start = 0;
  if (from) {
    start = times.indexOf(from);
  }

  let data = {
    labels: times.slice(start)
  };
  data.datasets = values
    .filter(it => it.checked)
    .map((it, i) => ({
      label: it.label,
      data: it.values.slice(start),
      fill: false,
      borderColor: colors1[i % colors1.length],
      backgroundColor: colors1[i % colors1.length]
    }));
  values
    .filter(it => it.checked)
    .filter(it => it.proyections)
    .map((it, i) => {
      if (it.proyections.length === 0) {
        it.proyections = createLinealProyections(it.values);
      }
      return it;
    })
    .map((it, i) => ({
      label: it.label + " Lineal Proyection",
      data: it.proyections.slice(start),
      fill: false,
      borderDash: [10, 5],
      borderColor: colors2[i % colors2.length],
      backgroundColor: colors2[i % colors2.length]
    }))
    .forEach(it => {
      data.datasets.push(it);
    });
  return (
    <div>
      <Line data={data} />
    </div>
  );
}

export default CovidGraph;
