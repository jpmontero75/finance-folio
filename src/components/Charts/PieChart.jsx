import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({ series }) => {
  const pieData = {      
    series,
    options: {
      chart: {
        width: 200,
        type: 'pie',
      },
      labels: ['Ocio', 'Ahorro','Gastos fijos'],
      legend: {
        position: 'left'
      },
      responsive: [{
        breakpoint: 180,
        options: {
          chart: {
            width: 100
          },
          legend: {
            position: 'left'
          }
        }
      }]
    },
  };

  return (
    <Chart
      options={pieData.options}
      series={pieData.series}
      type="pie"
      width="95%"
    />
  );
};

export default PieChart;