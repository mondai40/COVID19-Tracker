import React, { useState } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';

import './App.css';

function App() {
  const [countries, setCountries] = useState(['Japan', 'Korea', 'Canada']);

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select>
            {countries.map((country) => {
              return <MenuItem value={country}>{country}</MenuItem>;
            })}
            {/* <MenuItem value="world">World</MenuItem>
            <MenuItem value="Japan">Japan</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem> */}
          </Select>
        </FormControl>
      </div>

      {/* infobox */}
      {/* infobox */}
      {/* infobox */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
