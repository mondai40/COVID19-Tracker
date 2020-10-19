/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 2000,
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
  return data.map((country) => {
    return (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
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
