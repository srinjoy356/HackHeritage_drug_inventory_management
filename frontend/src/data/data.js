function getRandomDate(start, end) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleString();
}

export const productsData = [
    {
      id: 1,
      name: "Organic Honey",
      category: "Food & Beverage",
      expiryDate: "2025-08-15",
      price: 20.99,
      quantity:0,
      warehouse: "Warehouse A",
      image: "https://example.com/images/honey.jpg", // Replace with an actual image URL
      description: "Pure organic honey sourced from local farms. Perfect for adding sweetness to your dishes."
    },
    {
      id: 2,
      name: "Wireless Headphones",
      category: "Electronics",
      expiryDate: "2028-12-31",
      price: 150.00,
      quantity: 200,
      warehouse: "Warehouse B",
      image: "https://example.com/images/headphones.jpg", // Replace with an actual image URL
      description: "Noise-cancelling wireless headphones with high-quality sound and long battery life."
    },
    {
      id: 3,
      name: "Vitamin C Serum",
      category: "Beauty & Health",
      expiryDate: "2026-03-10",
      price: 30.50,
      quantity: 120,
      warehouse: "Warehouse C",
      image: "https://example.com/images/serum.jpg", // Replace with an actual image URL
      description: "Brightening Vitamin C serum for glowing skin. Suitable for all skin types."
    },
    {
      id: 4,
      name: "Eco-friendly Notebook",
      category: "Stationery",
      expiryDate: "2030-01-01",
      price: 12.99,
      quantity: 500,
      warehouse: "Warehouse D",
      image: "https://example.com/images/notebook.jpg", // Replace with an actual image URL
      description: "Eco-friendly notebook made from recycled paper. Perfect for everyday notes and sketches."
    },
    {
      id: 5,
      name: "LED Desk Lamp",
      category: "Home & Living",
      expiryDate: "2029-07-21",
      price: 45.00,
      quantity: 75,
      warehouse: "Warehouse E",
      image: "https://example.com/images/lamp.jpg", // Replace with an actual image URL
      description: "Modern LED desk lamp with adjustable brightness and flexible arm for perfect lighting."
    },
    {
      id: 6,
      name: "Green Tea",
      category: "Food & Beverage",
      expiryDate: "2024-11-30",
      price: 10.99,
      quantity: 300,
      warehouse: "Warehouse F",
      image: "https://example.com/images/greentea.jpg", // Replace with an actual image URL
      description: "Premium organic green tea leaves, rich in antioxidants and perfect for a healthy lifestyle."
    },
    {
      id: 7,
      name: "Smart Thermostat",
      category: "Home Automation",
      expiryDate: "2031-05-01",
      price: 199.99,
      quantity: 0,
      warehouse: "Warehouse G",
      image: "https://example.com/images/thermostat.jpg", // Replace with an actual image URL
      description: "Smart thermostat with Wi-Fi control and energy-saving features. Compatible with smart home systems."
    },
    {
      id: 8,
      name: "Yoga Mat",
      category: "Sports & Fitness",
      expiryDate: "2027-09-14",
      price: 25.99,
      quantity: 100,
      warehouse: "Warehouse H",
      image: "https://example.com/images/yogamat.jpg", // Replace with an actual image URL
      description: "Durable and non-slip yoga mat, ideal for all types of yoga and exercise routines."
    },
    {
      id: 9,
      name: "Bluetooth Speaker",
      category: "Electronics",
      expiryDate: "2032-02-28",
      price: 75.00,
      quantity: 150,
      warehouse: "Warehouse I",
      image: "https://example.com/images/speaker.jpg", // Replace with an actual image URL
      description: "Portable Bluetooth speaker with superior sound quality and water-resistant design."
    },
    {
      id: 10,
      name: "Ceramic Coffee Mug",
      category: "Home & Living",
      expiryDate: "2035-12-25",
      price: 8.50,
      quantity: 1000,
      warehouse: "Warehouse J",
      image: "https://example.com/images/coffeemug.jpg", // Replace with an actual image URL
      description: "Stylish ceramic coffee mug, perfect for enjoying your favorite hot beverages."
    },
    {
      id: 11,
      name: "Ceramic Coffee Mug",
      category: "Home & Living",
      expiryDate: "2035-12-25",
      price: 8.50,
      quantity: 1000,
      warehouse: "Warehouse J",
      image: "https://example.com/images/coffeemug.jpg", // Replace with an actual image URL
      description: "Stylish ceramic coffee mug, perfect for enjoying your favorite hot beverages."
    },
    {
      id: 11,
      name: "Portable Blender",
      category: "Home & Living",
      expiryDate: "2029-11-30",
      price: 55.00,
      quantity: 8,
      warehouse: "Warehouse K",
      image: "https://example.com/images/blender.jpg", // Replace with an actual image URL
      description: "Compact and powerful portable blender, perfect for making smoothies on the go."
    },
    {
      id: 12,
      name: "Fitness Tracker",
      category: "Sports & Fitness",
      expiryDate: "2027-10-01",
      price: 120.00,
      quantity: 10,
      warehouse: "Warehouse L",
      image: "https://example.com/images/fitness-tracker.jpg", // Replace with an actual image URL
      description: "Wearable fitness tracker with heart rate monitoring and activity tracking features."
    },
    {
      id: 13,
      name: "Digital Camera",
      category: "Electronics",
      expiryDate: "2026-05-15",
      price: 499.99,
      quantity: 3,
      warehouse: "Warehouse M",
      image: "https://example.com/images/digital-camera.jpg", // Replace with an actual image URL
      description: "High-resolution digital camera with advanced features for professional photography."
    },
    {
      id: 14,
      name: "Yoga Blocks",
      category: "Sports & Fitness",
      expiryDate: "2028-04-20",
      price: 15.00,
      quantity: 20,
      warehouse: "Warehouse N",
      image: "https://example.com/images/yoga-blocks.jpg", // Replace with an actual image URL
      description: "Durable foam yoga blocks for improved stability and support during yoga practice."
    },
    {
      id: 15,
      name: "Wireless Charger",
      category: "Electronics",
      expiryDate: "2030-03-01",
      price: 35.00,
      quantity: 9,
      warehouse: "Warehouse O",
      image: "https://example.com/images/wireless-charger.jpg", // Replace with an actual image URL
      description: "Convenient wireless charger with fast charging capabilities for compatible devices."
    },
    {
      id: 16,
      name: "Aspirin Tablets",
      category: "Medicine",
      expiryDate: "2025-12-31",
      price: 8.50,
      quantity: 500,
      warehouse: "Warehouse P",
      image: "https://example.com/images/aspirin.jpg", // Replace with an actual image URL
      description: "Pain relief and anti-inflammatory medication. Suitable for treating mild to moderate pain."
    },
    {
      id: 17,
      name: "Vitamin D Supplements",
      category: "Medicine",
      expiryDate: "2026-06-30",
      price: 12.00,
      quantity: 300,
      warehouse: "Warehouse Q",
      image: "https://example.com/images/vitamin-d.jpg", // Replace with an actual image URL
      description: "Vitamin D supplements to support bone health and immune function."
    },
    {
      id: 18,
      name: "Cough Syrup",
      category: "Medicine",
      expiryDate: "2024-10-15",
      price: 14.75,
      quantity: 5,
      warehouse: "Warehouse R",
      image: "https://example.com/images/cough-syrup.jpg", // Replace with an actual image URL
      description: "Effective cough syrup for relieving cough and throat irritation."
    }
  ];

  export const ordersData = [
    {
      id: 1,
      customerName: "Alice Johnson",
      customerPhoneNumber: "9876543210",
      customerAddress: "123 Main St, Springfield",
      products: [
        {
          product: productsData[0].name, // Organic Honey
          rate: productsData[0].price,
          quantity: 2,
          totalPrice: productsData[0].price * 2
        },
        {
          product: productsData[1].name, // Wireless Headphones
          rate: productsData[1].price,
          quantity: 1,
          totalPrice: productsData[1].price * 1
        }
      ],
      overallTotalPrice: productsData[0].price * 2 + productsData[1].price * 1,
      dateTime: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      status: "Paid"
    },
    {
      id: 2,
      customerName: "Bob Smith",
      customerPhoneNumber: "8765432109",
      customerAddress: "456 Oak Ave, Shelbyville",
      products: [
        {
          product: productsData[2].name, // Vitamin C Serum
          rate: productsData[2].price,
          quantity: 3,
          totalPrice: productsData[2].price * 3
        }
      ],
      overallTotalPrice: productsData[2].price * 3,
      dateTime: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      status: "Unpaid"
    },
    {
      id: 3,
      customerName: "Charlie Davis",
      customerPhoneNumber: "7654321098",
      customerAddress: "789 Maple Rd, Ogdenville",
      products: [
        {
          product: productsData[3].name, // Eco-friendly Notebook
          rate: productsData[3].price,
          quantity: 5,
          totalPrice: productsData[3].price * 5
        },
        {
          product: productsData[4].name, // LED Desk Lamp
          rate: productsData[4].price,
          quantity: 1,
          totalPrice: productsData[4].price * 1
        }
      ],
      overallTotalPrice: productsData[3].price * 5 + productsData[4].price * 1,
      dateTime: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      status: "Paid"
    },
    {
      id: 4,
      customerName: "Daisy Evans",
      customerPhoneNumber: "6543210987",
      customerAddress: "101 Pine St, Capital City",
      products: [
        {
          product: productsData[5].name, // Green Tea
          rate: productsData[5].price,
          quantity: 10,
          totalPrice: productsData[5].price * 10
        }
      ],
      overallTotalPrice: productsData[5].price * 10,
      dateTime: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      status: "Paid"
    },
    {
      id: 5,
      customerName: "Evan Wright",
      customerPhoneNumber: "5432109876",
      customerAddress: "202 Birch Ln, North Haverbrook",
      products: [
        {
          product: productsData[6].name, // Smart Thermostat
          rate: productsData[6].price,
          quantity: 1,
          totalPrice: productsData[6].price * 1
        },
        {
          product: productsData[7].name, // Yoga Mat
          rate: productsData[7].price,
          quantity: 2,
          totalPrice: productsData[7].price * 2
        }
      ],
      overallTotalPrice: productsData[6].price * 1 + productsData[7].price * 2,
      dateTime: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      status: "Unpaid"
    },
    {
      id: 6,
      customerName: "Frankie Harris",
      customerPhoneNumber: "4321098765",
      customerAddress: "303 Elm St, Brockway",
      products: [
        {
          product: productsData[8].name, // Bluetooth Speaker
          rate: productsData[8].price,
          quantity: 1,
          totalPrice: productsData[8].price * 1
        }
      ],
      overallTotalPrice: productsData[8].price * 1,
      dateTime: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      status: "Paid"
    },
    {
      id: 7,
      customerName: "Grace Foster",
      customerPhoneNumber: "3210987654",
      customerAddress: "404 Cedar Dr, Ogdenville",
      products: [
        {
          product: productsData[9].name, // Ceramic Coffee Mug
          rate: productsData[9].price,
          quantity: 6,
          totalPrice: productsData[9].price * 6
        }
      ],
      overallTotalPrice: productsData[9].price * 6,
      dateTime: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      status: "Unpaid"
    },
    {
      id: 8,
      customerName: "Hank Lewis",
      customerPhoneNumber: "2109876543",
      customerAddress: "505 Spruce St, Springfield",
      products: [
        {
          product: productsData[0].name, // Organic Honey
          rate: productsData[0].price,
          quantity: 4,
          totalPrice: productsData[0].price * 4
        },
        {
          product: productsData[1].name, // Wireless Headphones
          rate: productsData[1].price,
          quantity: 1,
          totalPrice: productsData[1].price * 1
        }
      ],
      overallTotalPrice: productsData[0].price * 4 + productsData[1].price * 1,
      dateTime: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      status: "Paid"
    },
    {
      id: 9,
      customerName: "Ivy Bennett",
      customerPhoneNumber: "1098765432",
      customerAddress: "606 Willow Ln, North Haverbrook",
      products: [
        {
          product: productsData[2].name, // Vitamin C Serum
          rate: productsData[2].price,
          quantity: 2,
          totalPrice: productsData[2].price * 2
        }
      ],
      overallTotalPrice: productsData[2].price * 2,
      dateTime: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      status: "Unpaid"
    },
    {
      id: 10,
      customerName: "Jackie Parker",
      customerPhoneNumber: "0987654321",
      customerAddress: "707 Maple St, Shelbyville",
      products: [
        {
          product: productsData[3].name, // Eco-friendly Notebook
          rate: productsData[3].price,
          quantity: 3,
          totalPrice: productsData[3].price * 3
        },
        {
          product: productsData[4].name, // LED Desk Lamp
          rate: productsData[4].price,
          quantity: 1,
          totalPrice: productsData[4].price * 1
        }
      ],
      overallTotalPrice: productsData[3].price * 3 + productsData[4].price * 1,
      dateTime:getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      status: "Paid"
    }
  ];
  
  
  

  