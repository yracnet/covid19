import React from "react";
import { Line } from "react-chartjs-2";
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
  "#85a8ba",
  "#96b6c5",
  "#adc4ce",
  "#eee0c9",
  "#f1f0e8",
  "#b29dd9",
  "#fdfd98",
  "#fe6b64",
  "#77dd77",
  "#779ecb",
  "#90c978",
  "#afd5aa",
  "#83c6dd",
  "#5db1d1",
  "#98e690",
  "#ebceed",
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
      borderColor: colors[i % colors.length],
      backgroundColor: colors[i % colors.length]
    }));

  return (
    <div>
      <h2>Time Line</h2>
      <Line data={data} />
    </div>
  );
}

export default CovidGraph;
