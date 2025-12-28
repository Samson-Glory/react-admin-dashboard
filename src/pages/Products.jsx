import { useState, useEffect } from "react";
import {
  Plus,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Package,
  TrendingUp,
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import DataTable from "../components/DataTable";
import { getProducts } from "../services/mockData";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 8;

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const data = getProducts();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, products]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const columns = [
    { header: "Product", className: "w-1/3" },
    { header: "Category", className: "w-1/5" },
    { header: "Price", className: "w-1/6" },
    { header: "Stock", className: "w-1/6" },
    { header: "Status", className: "w-1/6" },
    { header: "Actions", className: "w-1/6 text-right" },
  ];

  const renderRow = (product) => (
    <tr key={product.id}>
      <td>
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800"></div>
          <div className="ml-4">
            <div className="font-medium text-gray-900 dark:text-white">
              {product.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              SKU: {product.sku}
            </div>
          </div>
        </div>
      </td>
      <td>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {product.category}
        </span>
      </td>
      <td>
        <span className="font-medium text-gray-900 dark:text-white">
          {product.price}
        </span>
      </td>
      <td>
        <div className="flex items-center">
          <div className="mr-2 h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-full rounded-full ${
                product.stock > 20
                  ? "bg-success-500"
                  : product.stock > 10
                  ? "bg-warning-500"
                  : "bg-danger-500"
              }`}
              style={{
                width: `${Math.min((product.stock / 100) * 100, 100)}%`,
              }}
            />
          </div>
          <span className="text-sm font-medium">{product.stock}</span>
        </div>
      </td>
      <td>
        <span
          className={`badge ${
            product.status === "In Stock"
              ? "badge-success"
              : product.status === "Low Stock"
              ? "badge-warning"
              : "badge-danger"
          }`}
        >
          {product.status}
        </span>
      </td>
      <td className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" aria-label="View product">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" aria-label="Edit product">
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(product.id)}
            aria-label="Delete product"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Product Management
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your products, inventory, and pricing
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SearchInput
            onSearch={handleSearch}
            placeholder="Search products by name, SKU, or category..."
          />
        </div>
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Products
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {products.length}
            </p>
          </div>
          <div className="rounded-lg bg-primary-50 p-3 dark:bg-primary-900/20">
            <Package className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
        </Card>
      </div>

      {/* Products Table */}
      <Card padding="none">
        <DataTable
          columns={columns}
          data={paginatedProducts}
          renderRow={renderRow}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / pageSize)}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          loading={loading}
          emptyMessage="No products found. Try adjusting your search."
        />
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="text-center hover:cursor-pointer hover:border-primary-300 dark:hover:border-primary-700">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20">
            <Package className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="mb-1 font-medium text-gray-900 dark:text-white">
            Import Products
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Bulk import from CSV
          </p>
        </Card>
        <Card className="text-center hover:cursor-pointer hover:border-primary-300 dark:hover:border-primary-700">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success-50 dark:bg-success-900/20">
            <TrendingUp className="h-6 w-6 text-success-600 dark:text-success-400" />
          </div>
          <h3 className="mb-1 font-medium text-gray-900 dark:text-white">
            Sales Report
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            View sales analytics
          </p>
        </Card>
        <Card className="text-center hover:cursor-pointer hover:border-primary-300 dark:hover:border-primary-700">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-warning-50 dark:bg-warning-900/20">
            <Filter className="h-6 w-6 text-warning-600 dark:text-warning-400" />
          </div>
          <h3 className="mb-1 font-medium text-gray-900 dark:text-white">
            Categories
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage categories
          </p>
        </Card>
        <Card className="text-center hover:cursor-pointer hover:border-primary-300 dark:hover:border-primary-700">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/20">
            <MoreVertical className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="mb-1 font-medium text-gray-900 dark:text-white">
            More Actions
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Additional options
          </p>
        </Card>
      </div>
    </div>
  );
}
