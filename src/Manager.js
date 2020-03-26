import React from "react";
import { fetchTimeLine } from "./CovidService";
import CovidFilter from "./CovidFilter";
import CovidGraph from "./CovidGraph";
import "./Manager.scss";

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: "confirmed",
        from: "2020-01-01",
        to: "2020-03-30"
      },
      times: ["01", "02", "03", "04", "05"],
      countries: [
        {
          label: "line 1",
          checked: true,
          timeline: [5, 15, 2, 30, 5],
          increment: [0, 0, 10, 20, 30]
        },
        {
          label: "line 2",
          checked: true,
          timeline: [50, 5, 20, 30, 50],
          increment: [0, 0, 10, 20, 30]
        }
      ]
    };
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.onChangeConfig = this.onChangeConfig.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.reloadGraph = this.reloadGraph.bind(this);
  }

  onChangeConfig(event) {
    let { value, name } = event.currentTarget;
    let { config } = this.state;
    config[name] = value;
    this.setState({ config });
    console.log("config", config);
    if (name === "type") {
      this.reloadGraph();
    }
  }

  onChangeCheck(event) {
    let { countries } = this.state;
    let element = event.currentTarget;
    countries
      .filter(it => it.label === element.name)
      .forEach(it => (it.checked = element.checked));
    this.setState({ countries });
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
    fetchTimeLine(state.config.type, data => {
      state.times = data.labels;
      state.countries = data.values;
      state.config.from = "2020-03-10";
      state.config.to = state.times.last(22);
      state.countries
        .filter(it => it.label === "Bolivia")
        .forEach(it => {
          it.checked = true;
        });
      console.log("-->", state);
      this.setState(state);
    });
  }
  componentDidUpdate() {}
  reloadGraph() {
    let state = this.state;
    fetchTimeLine(state.config.type, data => {
      state.times = data.labels;
      state.countries = data.values;
      this.setState(state);
      this.forceUpdate();
    });
  }
  render() {
    let { countries, config, times } = this.state;
    return (
      <div className="container-fluid">
        <h3>COVID-19 TimeLine</h3>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-10">
            <CovidGraph
              values={countries}
              times={times}
              from={config.from}
              to={config.to}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-2">
            <CovidFilter
              countries={countries}
              times={times}
              config={config}
              onChangeConfig={this.onChangeConfig}
              onChangeCheck={this.onChangeCheck}
              onClickReset={this.onClickReset}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Manager;
