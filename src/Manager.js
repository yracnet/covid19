import React from "react";
import { fetchTimeLine } from "./CovidService";
import CovidFilter from "./CovidFilter";
import CovidGraph from "./CovidGraph";
import "./Manager.scss";

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Confirmed",
      from: "2020-01-01",
      times: ["01", "02", "03", "04", "05"],
      countries: [
        { label: "line 1", checked: true, values: [5, 15, 2, 30, 5] },
        { label: "line 2", checked: true, values: [50, 5, 20, 30, 50] }
      ]
    };
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.reloadGraph = this.reloadGraph.bind(this);
  }

  onChangeCheck(event) {
    let { countries } = this.state;
    let element = event.currentTarget;
    countries
      .filter(it => it.label === element.name)
      .forEach(it => (it.checked = element.checked));
    this.setState({ countries });
  }

  onChangeType(event) {
    let type = event.currentTarget.value;
    this.setState({ type });
    this.reloadGraph();
  }

  onChangeFrom(event) {
    let from = event.currentTarget.value;
    this.setState({ from });
  }

  onClickReset() {
    let { countries } = this.state;
    countries.forEach(it => {
      it.checked = false;
    });
    this.setState({ countries });
  }
  componentDidMount() {
    let state = this.state;
    fetchTimeLine(state.type, data => {
      state.times = data.labels;
      state.countries = data.values;
      state.from = "2020-03-10";
      state.countries
        .filter(it => it.label === "Bolivia")
        .forEach(it => {
          it.checked = true;
        });
      this.setState(state);
    });
  }
  componentDidUpdate() {}
  reloadGraph() {
    let state = this.state;
    fetchTimeLine(state.type, data => {
      state.times = data.labels;
      state.countries = data.values;
      this.setState(state);
      this.forceUpdate();
    });
  }
  render() {
    let { countries, type, times, from } = this.state;
    return (
      <div className="container-fluid">
        <h3>COVID-19 TimeLine</h3>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-10">
            <CovidGraph values={countries} times={times} from={from} />
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-2">
            <CovidFilter
              countries={countries}
              times={times}
              type={type}
              from={from}
              onChangeCheck={this.onChangeCheck}
              onChangeType={this.onChangeType}
              onChangeFrom={this.onChangeFrom}
              onClickReset={this.onClickReset}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Manager;
