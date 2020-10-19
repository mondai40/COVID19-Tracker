/* eslint-disable react/no-array-index-key */
import React from 'react';
import numeral from 'numeral';

import './Table.css';

function Table({ countries, casesType = 'cases' }) {
  return (
    <table className="table">
      <tbody>
        {countries.map((country, index) => (
          <tr key={index}>
            <td>{country.country}</td>
            <td>
              <strong>{numeral(country[casesType]).format('0,0')}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
