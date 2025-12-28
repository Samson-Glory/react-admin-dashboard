/**
 * Mock data service for demonstration purposes
 * In a real application, replace with actual API calls
 */

// Generate mock products
export const getProducts = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    sku: `SKU-${1000 + i}`,
    category:
      i % 3 === 0 ? "Electronics" : i % 3 === 1 ? "Clothing" : "Home & Kitchen",
    price: `$${(Math.random() * 500 + 20).toFixed(2)}`,
    stock: Math.floor(Math.random() * 100),
    status:
      Math.random() > 0.7
        ? "Out of Stock"
        : Math.random() > 0.4
        ? "Low Stock"
        : "In Stock",
    description: "High-quality product with excellent features",
    createdAt: "2024-01-15",
  }));
};

// Generate mock users
export const getUsers = () => {
  const firstNames = [
    "Alex",
    "Jordan",
    "Taylor",
    "Morgan",
    "Casey",
    "Riley",
    "Avery",
    "Quinn",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
  ];
  const domains = ["example.com", "test.com", "demo.com", "mail.com"];

  return Array.from({ length: 32 }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName =
      lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const domain = domains[i % domains.length];

    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      phone: `+1 (555) ${100 + i}-${1000 + i}`,
      role:
        i % 4 === 0
          ? "Admin"
          : i % 4 === 1
          ? "Editor"
          : i % 4 === 2
          ? "Viewer"
          : "User",
      status:
        Math.random() > 0.8
          ? "Inactive"
          : Math.random() > 0.6
          ? "Pending"
          : "Active",
      joined: `2024-0${Math.floor(Math.random() * 9) + 1}-${
        Math.floor(Math.random() * 28) + 1
      }`,
      lastActive: `${Math.floor(Math.random() * 24)}h ago`,
    };
  });
};

// Dashboard statistics
export const getDashboardStats = () => {
  return [
    {
      id: 1,
      label: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: "DollarSign",
    },
    {
      id: 2,
      label: "New Customers",
      value: "2,350",
      change: "+180.1%",
      icon: "Users",
    },
    {
      id: 3,
      label: "Products Sold",
      value: "12,234",
      change: "-19%",
      icon: "Package",
    },
    {
      id: 4,
      label: "Active Users",
      value: "573",
      change: "+12.5%",
      icon: "Activity",
    },
  ];
};

// Recent activity
export const getRecentActivity = () => {
  return [
    {
      id: 1,
      type: "order",
      title: "New order placed",
      description: "Order #ORD-78945 from John Smith",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "payment",
      title: "Payment received",
      description: "$1,250.00 from Acme Inc.",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "user",
      title: "New user registered",
      description: "Taylor Swift joined the platform",
      time: "2 hours ago",
    },
    {
      id: 4,
      type: "order",
      title: "Order shipped",
      description: "Order #ORD-78944 has been shipped",
      time: "1 day ago",
    },
    {
      id: 5,
      type: "payment",
      title: "Subscription renewed",
      description: "Premium plan - Annual subscription",
      time: "2 days ago",
    },
  ];
};

// Export all mock data functions
export default {
  getProducts,
  getUsers,
  getDashboardStats,
  getRecentActivity,
};
