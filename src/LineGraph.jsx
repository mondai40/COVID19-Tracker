import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function LineGraph() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    (async function getDataForChart() {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response) => response.json())
        .then((data) => {
          console.log('test', data);
        });
    })();
  }, []);

  return (
    <div>
      <h1>I'm a graph</h1>
      {/* <Line data options /> */}
    </div>
  );
}

export default LineGraph;
