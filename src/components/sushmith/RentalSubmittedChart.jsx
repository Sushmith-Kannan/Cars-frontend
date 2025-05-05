import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RentalSubmittedDashboard = ({ rentals, pendingRentals, approvedRentals }) => {
    const [barData, setBarData] = useState(null);
    const [statusData, setStatusData] = useState(null);
  
    useEffect(() => {
      if (!rentals || !rentals.length) return;
  
      const modelCount = { Pending: {}, Approved: {} };
      const statusCount = { Pending: 0, Approved: 0 };
  
      // Count pending and approved rentals by car model
      pendingRentals.forEach(rental => {
        const model = `${rental.car?.carMake} ${rental.car?.carModel}`;
        modelCount.Pending[model] = (modelCount.Pending[model] || 0) + 1;
        statusCount.Pending++;
      });
  
      approvedRentals.forEach(rental => {
        const model = `${rental.car?.carMake} ${rental.car?.carModel}`;
        modelCount.Approved[model] = (modelCount.Approved[model] || 0) + 1;
        statusCount.Approved++;
      });
  
      // Prepare bar chart data for rental count by model
      setBarData({
        labels: Object.keys(modelCount.Pending),
        datasets: [
          {
            label: 'Pending Rentals',
            data: Object.values(modelCount.Pending),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Approved Rentals',
            data: Object.values(modelCount.Approved),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      });
  
      // Prepare bar chart data for rental status distribution
      setStatusData({
        labels: ['Pending', 'Approved'],
        datasets: [
          {
            label: 'Rental Status Count',
            data: [statusCount.Pending, statusCount.Approved],
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
          }
        ]
      });
    }, [pendingRentals, approvedRentals]);
  
    return (
      <div className="container my-5">
        <h3 className="mb-4">Rental Analytics</h3>
        <div className="row justify-content-between">
          {/* First Chart - Rental Count by Car Model */}
          {/* <div className="col-md-6 mb-4">
            <h5>Rental Count by Car Model</h5>
            {barData?.datasets?.length ? (
              <Bar data={barData} height={200} options={{ responsive: true }} />
            ) : (
              <p>No data available</p>
            )}
          </div> */}
  
          {/* Second Chart - Rental Status Distribution */}
          <div className="col-md-6 mb-4">
            <h5>Rental Status Distribution</h5>
            {statusData?.datasets?.length ? (
              <Bar data={statusData} height={200} options={{ responsive: true }} />
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  

export default RentalSubmittedDashboard;
