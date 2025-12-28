import { useState, useEffect } from "react";
import {
  Plus,
  Mail,
  Phone,
  Calendar,
  Shield,
  MoreVertical,
  Users as UsersIcon,
  Activity,
  Edit,
  Eye,
  User as UserIcon,
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import DataTable from "../components/DataTable";

// Mock data
const getUsers = () => [
  {
    id: 1,
    name: "Alice Johnson",
    username: "alicej",
    email: "alice@example.com",
    phone: "555-1234",
    role: "Admin",
    status: "Active",
    joined: "2025-01-12",
  },
  {
    id: 2,
    name: "Bob Smith",
    username: "bobsmith",
    email: "bob@example.com",
    phone: "555-5678",
    role: "Editor",
    status: "Pending",
    joined: "2025-02-03",
  },
  {
    id: 3,
    name: "Charlie Brown",
    username: "charlieb",
    email: "charlie@example.com",
    phone: "555-9012",
    role: "Viewer",
    status: "Inactive",
    joined: "2025-03-15",
  },
  // Add more users here...
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 8;

  // Load mock data
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getUsers();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, users]);

  const handleSearch = (query) => setSearchQuery(query);

  const handleRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const columns = [
    { header: "User" },
    { header: "Contact" },
    { header: "Role" },
    { header: "Status" },
    { header: "Joined" },
    { header: "Actions", className: "text-right" },
  ];

  const renderRow = (user) => (
    <tr key={user.id}>
      <td>
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
          <div className="ml-4">
            <div className="font-medium text-gray-900 dark:text-white">
              {user.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              @{user.username}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Mail className="mr-2 h-4 w-4" /> {user.email}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Phone className="mr-2 h-4 w-4" /> {user.phone}
          </div>
        </div>
      </td>
      <td>
        <select
          value={user.role}
          onChange={(e) => handleRoleChange(user.id, e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
          <option value="User">User</option>
        </select>
      </td>
      <td>
        <span
          className={`badge ${
            user.status === "Active"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400"
              : user.status === "Pending"
              ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-600 dark:text-yellow-50"
              : "bg-red-50 text-red-600 dark:bg-red-600 dark:text-red-50"
          }`}
        >
          {user.status}
        </span>
      </td>
      <td>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="mr-2 h-4 w-4" /> {user.joined}
        </div>
      </td>
      <td className="text-right">
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      change: "+12%",
      icon: UsersIcon,
    },
    {
      label: "Active Now",
      value: users.filter((u) => u.status === "Active").length,
      change: "+8%",
      icon: Activity,
    },
    {
      label: "Admins",
      value: users.filter((u) => u.role === "Admin").length,
      change: "+2",
      icon: Shield,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            User Management
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchInput
            onSearch={handleSearch}
            placeholder="Search users by name, email, or role..."
          />
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Filter by Role</Button>
          <Button variant="secondary">Filter by Status</Button>
        </div>
      </div>

      {/* Users Table */}
      <Card padding="none">
        <DataTable
          columns={columns}
          data={paginatedUsers}
          renderRow={renderRow}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / pageSize)}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          loading={loading}
          emptyMessage="No users found. Try adjusting your search."
        />
      </Card>
    </div>
  );
}
