import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

import 'chartjs-adapter-date-fns'; // For date support in x-axis (optional)

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
);

const RentalChartDashboard = ({ rentals }) => {
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    if (!rentals || !rentals.length) return;

    const modelCount = {};
    const revenueByModel = {};
    const rentalsPerDate = {};

    rentals.forEach(rental => {
      const model = `${rental.car?.carMake} ${rental.car?.carModel}`;
      modelCount[model] = (modelCount[model] || 0) + 1;
      revenueByModel[model] = (revenueByModel[model] || 0) + rental.cost;

      const date = new Date(rental.startDate).toISOString().split('T')[0]; // Format as YYYY-MM-DD
      rentalsPerDate[date] = (rentalsPerDate[date] || 0) + 1;
    });

    // Bar Chart - Rental Count by Car Model
    setBarData({
      labels: Object.keys(modelCount),
      datasets: [{
        label: 'Rental Count',
        data: Object.values(modelCount),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      }]
    });

    // Line Chart - Rentals Over Time
    const sortedDates = Object.keys(rentalsPerDate).sort();
    setLineData({
      labels: sortedDates,
      datasets: [{
        label: 'Rentals per Day',
        data: sortedDates.map(date => rentalsPerDate[date]),
        fill: false,
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB',
        tension: 0.3
      }]
    });

    // Revenue Chart
    setRevenueData({
      labels: Object.keys(revenueByModel),
      datasets: [{
        label: 'Total Revenue ($)',
        data: Object.values(revenueByModel),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    });
  }, [rentals]);

  return (
    <div className="container my-5">
      <h3 className="mb-4">Rental Analytics</h3>
      <div className="d-flex flex-wrap justify-content-between gap-3">
        <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
          <h5>Rental Count by Car Model</h5>
          {barData?.datasets?.length ? <Bar data={barData} /> : <p>No data</p>}
        </div>
        <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
          <h5>Rentals Over Time</h5>
          {lineData?.datasets?.length ? <Line data={lineData} /> : <p>No data</p>}
        </div>
        <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
          <h5>Revenue by Car Model</h5>
          {revenueData?.datasets?.length ? <Bar data={revenueData} /> : <p>No data</p>}
        </div>
      </div>
    </div>
  );
};

export default RentalChartDashboard;
