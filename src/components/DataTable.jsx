import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Button from "./Button";

/**
 * Reusable data table component with pagination and sorting
 * @param {Object} props
 * @param {Array} props.columns - Table column definitions
 * @param {Array} props.data - Table data
 * @param {Function} props.renderRow - Function to render each row
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {number} props.pageSize - Items per page
 * @param {Function} props.onPageChange - Page change handler
 * @param {boolean} props.loading - Loading state
 * @param {string} props.emptyMessage - Message when no data
 */
export default function DataTable({
  columns,
  data,
  renderRow,
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  onPageChange,
  loading = false,
  emptyMessage = "No data available",
}) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, data.length);
  const totalItems = data.length;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange?.(page);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
        <div className="mx-auto max-w-md">
          <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800"></div>
          <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
            {emptyMessage}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={column.className}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{startItem}</span> to{" "}
                <span className="font-medium">{endItem}</span> of{" "}
                <span className="font-medium">{totalItems}</span> results
              </p>
            </div>

            <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="rounded-r-none"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-none border-l-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center px-4 py-2 text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-none border-r-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="rounded-l-none"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
