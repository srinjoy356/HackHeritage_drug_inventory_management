import React from 'react';
import Sidebar from '../Sidebar';
import Nav from './Nav';
import { Pie, Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './Dashboard.css'
import {productsData , ordersData} from '../../data/data'; // Adjust the path as necessary
import './ProductList.css'; // Ensure this CSS file is created as well

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const calculateTopSellingProducts = () => {
    const productSales = {};

    ordersData.forEach(order => {
        order.products.forEach(item => {
            if (productSales[item.product]) {
                productSales[item.product] += item.totalPrice;
            } else {
                productSales[item.product] = item.totalPrice;
            }
        });
    });

    return Object.entries(productSales)
        .map(([name, totalSales]) => ({
            ...productsData.find(product => product.name === name),
            totalSales
        }))
        .sort((a, b) => b.totalSales - a.totalSales)
        .slice(0, 5); // Top 5 selling products
};

const calculateRestockProducts = () => {
    return productsData.filter(product => product.quantity < 10);
};

const Details = () => {
    const topSellingProducts = calculateTopSellingProducts();
    const restockProducts = calculateRestockProducts();
    const calculateTotalSales = (orders) => {
        const sales = {};
      
        orders.forEach(order => {
          order.products.forEach(item => {
            if (!sales[item.product]) {
              sales[item.product] = 0;
            }
            sales[item.product] += item.totalPrice;
          });
        });
      
        return sales;
      };
      
      const calculateOrderValues = (orders) => {
        const values = orders.map(order => order.overallTotalPrice);
        const average = values.reduce((sum, value) => sum + value, 0) / values.length;
        const highest = Math.max(...values);
      
        return { average, highest };
      };
      
      // Process data for charts
     
      
      // Pie Chart Data
       // Prepare the data for the top 10 selling products
       const sales = calculateTotalSales(ordersData);
       const sortedSales = Object.entries(sales).sort((a, b) => b[1] - a[1]);
       const top10Products = sortedSales.slice(0, 10);
       const labels = top10Products.map(item => item[0]);
       const data = top10Products.map(item => item[1]);
       
       const { average, highest } = calculateOrderValues(ordersData);
       
       // Pie Chart Data
       const pieChartData = {
         labels: labels,
         datasets: [
           {
             label: 'Top 10 Selling Products',
             data: data,
             backgroundColor: [
               '#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57',
               '#33A1FF', '#FF33F6', '#F6FF33', '#33F6FF', '#F6FF33'
             ],
             borderWidth: 1
           }
         ]
       };
       
       // Bar Chart Data
       const barChartData = {
         labels: ['Average Order Value', 'Highest Order Value'],
         datasets: [
           {
             label: 'Order Values',
             data: [average, highest],
             backgroundColor: ['#FF6384', '#36A2EB'],
             borderColor: ['#FF6384', '#36A2EB'],
             borderWidth: 1
           }
         ]
       };
    return (
        <>
        <Sidebar/>
        <div className='dashboard-container'>
            <Nav/>
            <div className="product-list">
            <div className="table-container">
                <div className="table-section">
                    <h2>Top Selling Products</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Total Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topSellingProducts.map(product => (
                                <tr key={product.id}>
                                    <td><img src={product.image} alt={product.name} className="table-image" /></td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>${product.totalSales.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="table-section">
                    <h2>Products to Restock</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restockProducts.map(product => (
                                <tr key={product.id}>
                                    <td><img src={product.image} alt={product.name} className="table-image" /></td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="statistics">
            <div className='chart-container-pie'>
        <h2>Top 10 Selling Products</h2>
        <Pie data={pieChartData} />
        </div>
      <div className="chart-container-bar">
        <h2>Order Value Statistics</h2>
        <Bar data={barChartData} />
      </div>
      </div>
        </div>
        </>
    );
};

export default Details;
