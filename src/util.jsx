/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeStyles = {
  cases: {
    hex: '#CC1034',
    multiplier: 700,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 800,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 900,
  },
};

export const sortData = (data, casesType = 'cases') => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a[casesType] > b[casesType] ? -1 : 1));
};

export const prettyPrintStat = (stat) => {
  return stat ? `+${numeral(stat).format('0.0a')}` : '+0';
};

// draw circles on the map with interactive tooltip(popup)
export const showDataOnMap = (data, casesType = 'cases') => {
  return data.map((country, index) => {
    return (
      <Circle
        key={index}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeStyles[casesType].hex}
        fillColor={casesTypeStyles[casesType].hex}
        radius={
          Math.sqrt(country[casesType]) * casesTypeStyles[casesType].multiplier
        }
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{
                backgroundImage: `url(${country.countryInfo.flag})`,
                backgroundPosition: 'center',
              }}
            />
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(country.cases).format('0,0')}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country.recovered).format('0,0')}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format('0,0')}
            </div>
          </div>
        </Popup>
      </Circle>
    );
  });
};

const handleErrors = (response) => {
  if (response.ok) {
    return response;
  }

  switch (response.status) {
    case 400:
      throw Error('INVALID_TOKEN');
    case 401:
      throw Error('UNAUTHORIZED');
    case 500:
      throw Error('INTERNAL_SERVER_ERROR');
    case 502:
      throw Error('BAD_GATEWAY');
    case 404:
      throw Error('NOT_FOUND');
    default:
      throw Error('UNHANDLED_ERROR');
  }
};

export const fetchWithErrorHandling = (url, options) =>
  fetch(url, options)
    // 1. error handling by network, connection.
    .catch((e) => {
      throw Error(e);
    })
    // 2. error handling by status code from a server
    .then(handleErrors)
    // 3. manupulate data
    .then((response) => response.json())
    .then((data) => data);
