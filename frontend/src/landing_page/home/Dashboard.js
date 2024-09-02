import React from 'react';
import { PieChart, Pie, Cell, BarChart,AreaChart, Bar,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import {productsData , ordersData} from '../../data/data'; 
import './Dashboards.css';
import Sidebar from '../Sidebar';
import Header from './Haeder';
import CategorySalesChart from './Piechart';
import './CategorySalesChart.css';
import Nav from './Nav';

function Dashboard() {
  // Sample data for charts
  const productCategories = [...new Set(productsData.map(product => product.category))];
  const totalInventoryValue = productsData.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  const outOfStockProducts = productsData.filter(product => product.quantity === 0).length;
  const countOrdersByStatus = (orders) => {
    // Initialize counters
    let paidCount = 0;
    let unpaidCount = 0;
  
    // Iterate through the orders and count the statuses
    orders.forEach(order => {
      if (order.status === 'Paid') {
        paidCount++;
      } else if (order.status === 'Unpaid') {
        unpaidCount++;
      }
    });
  
    // Return the counts as an object
    return {
      paid: paidCount,
      unpaid: unpaidCount
    };
  };
  function countUniqueShelves(products) {
    // Use a Set to store unique shelf numbers
    const shelves = new Set();
  
    // Iterate through each product and add the shelf number to the Set
    products.forEach(product => {
      if (product.shelfNumber) {
        shelves.add(product.shelfNumber);
      }
    });
  
    // Return the number of unique shelves
    return shelves.size;
  }
  
  // Example usage
  const totalUniqueShelves = countUniqueShelves(productsData);
  const { paid, unpaid } = countOrdersByStatus(ordersData);
  const unpaidOrders = unpaid 
  const numberOfOrders = ordersData.length; 
  const ordersPlaced = paid; 
  const numberOfWarehouses = totalUniqueShelves; // Example number

  // Prepare data for charts
  const categoryData = productCategories.map(category => ({
    name: category,
    value: productsData.filter(product => product.category === category).reduce((acc, product) => acc + product.quantity, 0),
  }));
  // Function to generate random sales data for each month
function generateMonthlySalesData() {
  let monthlySales = [];
  for (let i = 0; i < 12; i++) {
      // Generating random sales between 5000 and 20000
      let sales = Math.floor(Math.random() * 15001) + 5000;
      monthlySales.push(sales);
  }
  return monthlySales;
}

// Function to store sales data for the year 2023
function storeSalesOf2023() {
  let salesOf2023 = generateMonthlySalesData();
  console.log("Sales of 2023: ", salesOf2023);
  return salesOf2023;
}

// Function to store sales data for the year 2024
function storeSalesOf2024() {
  let salesOf2024 = generateMonthlySalesData();
  console.log("Sales of 2024: ", salesOf2024);
  return salesOf2024;
}

// Store sales data
let sales2023 = storeSalesOf2023();
let sales2024 = storeSalesOf2024();


  const salesData = [
    { month: 'Jan', Sales_this_year: sales2024[0] , Sales_prev_year: sales2023[0] },
    { month: 'Feb', Sales_this_year: sales2024[1]  , Sales_prev_year: sales2023[1]  },
    { month: 'Mar', Sales_this_year: sales2024[2]  , Sales_prev_year:sales2023[2] },
    { month: 'Apr', Sales_this_year: sales2024[3]  , Sales_prev_year:sales2023[3] },
    { month: 'May', Sales_this_year: sales2024[4]  , Sales_prev_year:sales2023[4] },
    { month: 'Jun', Sales_this_year: sales2024[5]  , Sales_prev_year: sales2023[5]},
    { month: 'Jul', Sales_this_year: sales2024[6]  , Sales_prev_year:sales2023[6] },
    { month: 'Aug', Sales_this_year: sales2024[7]  , Sales_prev_year:sales2023[7] },
    { month: 'Sep', Sales_this_year: sales2024[8]  , Sales_prev_year:sales2023[8] },
    { month: 'Oct', Sales_this_year:sales2024[9]  , Sales_prev_year: sales2023[9]},
    { month: 'Nov', Sales_this_year: sales2024[10]  , Sales_prev_year:sales2023[10]},
    { month: 'Dec', Sales_this_year: sales2024[11]  , Sales_prev_year: sales2023[11]},
  ];
;


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF0000'];

  return (
    <>
    <Sidebar/>
    <div className="dashboard-container">
      <Nav/>
      
     <Header/>
      <div className="dashboard-metrics">
        <div className="metric-card">
          <h2>{productsData.length}</h2>
          <p>Number of Products</p>
        </div>
        <div className="metric-card">
          <h2>{numberOfOrders}</h2>
          <p>Number of Orders</p>
        </div>
        <div className="metric-card">
          <h2>{productCategories.length}</h2>
          <p>Number of Categories</p>
        </div>
        <div className="metric-card">
          <h2>{numberOfWarehouses}</h2>
          <p>Number of Shelfs</p>
        </div>
        <div className="metric-card">
          <h2>&#x20b9;{totalInventoryValue.toFixed(2)}</h2>
          <p>Total Value of Inventory</p>
        </div>
        <div className="metric-card">
          <h2>{ordersPlaced}</h2>
          <p>Number of Orders Placed</p>
        </div>
        <div className="metric-card">
          <h2>{unpaidOrders}</h2>
          <p>Unpaid Orders</p>
        </div>
        <div className="metric-card">
          <h2>{outOfStockProducts}</h2>
          <p>Out of Stock Products</p>
        </div>
      </div>

      <div className="dashboard-charts">
        
        <div className="chart-card">
          <h3>Monthly Sales Trend</h3>
          <AreaChart width={630} height={400} data={salesData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip />
  <Tooltip />
  <Area type="monotone" dataKey="Sales_this_year" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey="Sales_prev_year" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
        </div>
        <CategorySalesChart/>

         

      </div>
    </div>
    </>
  );
}

export default Dashboard;
