import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const casesTypeColors = {
  cases: {
    backgroundColor: 'rgba(204, 16, 52, 0.4)',
    borderColor: '#CC1034',
  },
  recovered: {
    backgroundColor: 'rgba(125, 215, 29, 0.4)',
    borderColor: '#7dd71d',
  },
  deaths: {
    backgroundColor: 'rgba(251, 68, 67, 0.4)',
    borderColor: '#fb4443',
  },
};

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

function LineGraph({ casesType = 'cases', className }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    (async function getDataForChart() {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response) => response.json())
        .then((data) => {
          setChartData(buildChartData(data, casesType));
        });
    })();
  }, [casesType]);

  return (
    <div className={className}>
      {chartData?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: casesTypeColors[casesType].backgroundColor,
                borderColor: casesTypeColors[casesType].borderColor,
                data: chartData,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
