import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const buildChartData = (data, casesType = 'cases') => {
  const chartData = [];
  let lastDataPoint;
  Object.entries(data[casesType]).forEach(([date, cases]) => {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: cases - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = cases;
  });
  return chartData;
};

function LineGraph() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    (async function getDataForChart() {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response) => response.json())
        .then((data) => {
          setChartData(buildChartData(data));
        });
    })();
  }, []);

  return (
    <div>
      <h1>I'm a graph</h1>
      {/* <Line data options /> */}
      {console.log('hre', chartData)}
    </div>
  );
}

export default LineGraph;
