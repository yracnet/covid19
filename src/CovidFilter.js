import React, { useState } from "react";

function CovidFilter({
  countries,
  times,
  type,
  from,
  onChangeFrom,
  onChangeCheck,
  onChangeType,
  onClickReset
}) {
  let [filter, setFilter] = useState("");
  let onChangeFilter = event => {
    setFilter(event.currentTarget.value);
  };
  let filterCountries = countries || [];
  if (filter) {
    filterCountries = filterCountries.filter(it => {
      let label = it.label || "";
      label = label.toUpperCase();
      return label.includes(filter.toUpperCase());
    });
  }

  return (
    <div className="list-group CovidFilter">
      <h2>Covid</h2>
      <table className="table table-responsive table-sm">
        <thead>
          <tr>
            <th>Mode</th>
            <th>
              <select
                name="type"
                className="form-control form-control-sm"
                defaultValue={type}
                onChange={onChangeType}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Deaths">Deaths</option>
                <option value="Recovered">Recovered</option>
              </select>
            </th>
          </tr>
          <tr>
            <th>From</th>
            <th>
              <div className="input-group">
                <select
                  name="type"
                  className="form-control form-control-sm"
                  value={from}
                  onChange={onChangeFrom}
                >
                  {times.map(it => (
                    <option value={it}>{it}</option>
                  ))}
                </select>
                <div className="input-group-append">
                  <button
                    className="btn btn-sm btn-danger"
                    type="button"
                    onClick={e => {
                      e.currentTarget.value = times[0];
                      onChangeFrom(e);
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th>View</th>
            <th>
              <div className="input-group">
                <input
                  name="filter"
                  className="form-control form-control-sm"
                  type="text"
                  defaultValue={filter}
                  onChange={onChangeFilter}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-sm btn-danger"
                    type="button"
                    onClick={onClickReset}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filterCountries.map((it, index) => (
            <tr key={it.label}>
              <th>
                <input
                  name={it.label}
                  type="checkbox"
                  checked={it.checked}
                  onChange={onChangeCheck}
                />
              </th>
              <td>{it.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CovidFilter;
