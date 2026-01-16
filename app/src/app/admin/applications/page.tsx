"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

interface Application {
  id: string;
  reference_number: string;
  email: string;
  whatsapp: string;
  status: string;
  payment_status: string;
  visa_speed: string;
  amount_usd: number;
  entry_date: string;
  exit_date: string;
  created_at: string;
  paid_at: string | null;
  applicants: { id: string; full_name: string; nationality: string }[];
}

// Deadline thresholds in minutes based on visa speed
const DEADLINE_THRESHOLDS: Record<string, number> = {
  "30-min": 30,
  "4-hour": 240,
  "1-day": 1440, // 24 hours
  "2-day": 2880, // 48 hours
  "weekend": 4320, // 72 hours
};

// Get time since payment and urgency level
function getTimeSincePayment(paidAt: string | null, visaSpeed: string): {
  elapsed: string;
  minutes: number;
  urgency: "ok" | "warning" | "critical" | "overdue";
} {
  if (!paidAt) {
    return { elapsed: "-", minutes: 0, urgency: "ok" };
  }

  const now = new Date();
  const paymentTime = new Date(paidAt);
  const diffMs = now.getTime() - paymentTime.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  // Format elapsed time
  let elapsed: string;
  if (diffMinutes < 60) {
    elapsed = `${diffMinutes}m`;
  } else if (diffMinutes < 1440) {
    const hours = Math.floor(diffMinutes / 60);
    const mins = diffMinutes % 60;
    elapsed = mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  } else {
    const days = Math.floor(diffMinutes / 1440);
    const hours = Math.floor((diffMinutes % 1440) / 60);
    elapsed = hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  }

  // Determine urgency based on visa speed deadline
  const deadline = DEADLINE_THRESHOLDS[visaSpeed] || 90; // Default 1.5h for unknown
  const warningThreshold = deadline * 0.7; // 70% of deadline
  const criticalThreshold = deadline * 0.9; // 90% of deadline

  let urgency: "ok" | "warning" | "critical" | "overdue";
  if (diffMinutes >= deadline) {
    urgency = "overdue";
  } else if (diffMinutes >= criticalThreshold) {
    urgency = "critical";
  } else if (diffMinutes >= warningThreshold) {
    urgency = "warning";
  } else {
    urgency = "ok";
  }

  return { elapsed, minutes: diffMinutes, urgency };
}

// Urgency badge colors
const urgencyColors: Record<string, string> = {
  ok: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  critical: "bg-orange-100 text-orange-800",
  overdue: "bg-red-100 text-red-800 animate-pulse",
};

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setTick] = useState(0); // Force re-render for timer updates
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentStatus = searchParams.get("status") || "";
  const currentSearch = searchParams.get("search") || "";

  const fetchApplications = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", currentPage.toString());
      params.set("limit", "20");
      if (currentStatus) params.set("status", currentStatus);
      if (currentSearch) params.set("search", currentSearch);

      const response = await fetch(`/api/admin/applications?${params}`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentStatus, currentSearch]);

  // Initial fetch
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Auto-refresh every 30 seconds for new applications
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchApplications(false);
    }, 30000);
    return () => clearInterval(refreshInterval);
  }, [fetchApplications]);

  // Update timer display every minute
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTick((t) => t + 1);
    }, 60000);
    return () => clearInterval(timerInterval);
  }, []);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") params.set("page", "1"); // Reset to page 1 when filtering
    router.push(`/admin/applications?${params.toString()}`);
  };

  const statusColors: Record<string, string> = {
    pending_payment: "bg-yellow-100 text-yellow-800",
    payment_received: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    delivered: "bg-green-100 text-green-800",
  };

  const paymentColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        <p className="text-gray-600 mt-1">Manage all visa applications</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by reference or email..."
              defaultValue={currentSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateFilters("search", e.currentTarget.value);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={currentStatus}
            onChange={(e) => updateFilters("status", e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
          >
            <option value="">All Statuses</option>
            <option value="pending_payment">Pending Payment</option>
            <option value="payment_received">Payment Received</option>
            <option value="processing">Processing</option>
            <option value="approved">Approved</option>
            <option value="delivered">Delivered</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">⏱️ Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travel Dates</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
                        No applications found
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => {
                      const timeInfo = app.payment_status === "completed" && !["delivered", "approved", "rejected"].includes(app.status)
                        ? getTimeSincePayment(app.paid_at, app.visa_speed)
                        : null;
                      const rowBg = timeInfo?.urgency === "overdue" ? "bg-red-50 hover:bg-red-100" :
                                    timeInfo?.urgency === "critical" ? "bg-orange-50 hover:bg-orange-100" :
                                    "hover:bg-gray-50";
                      return (
                      <tr key={app.id} className={rowBg}>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/applications/${app.id}`}
                            className="font-medium hover:underline"
                            style={{ color: "#ef7175" }}
                          >
                            {app.reference_number}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {app.applicants?.map((a) => (
                              <div key={a.id}>{a.full_name}</div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <div>{app.email}</div>
                            <div className="text-gray-400">{app.whatsapp}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status] || "bg-gray-100 text-gray-800"}`}>
                            {app.status?.replace(/_/g, " ") || "Unknown"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${paymentColors[app.payment_status] || "bg-gray-100 text-gray-800"}`}>
                            {app.payment_status || "pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {app.visa_speed || "-"}
                        </td>
                        <td className="px-6 py-4">
                          {timeInfo ? (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${urgencyColors[timeInfo.urgency]}`}
                              title={`Deadline: ${DEADLINE_THRESHOLDS[app.visa_speed] || 90} minutes`}
                            >
                              {timeInfo.urgency === "overdue" && "🚨 "}
                              {timeInfo.urgency === "critical" && "⚠️ "}
                              {timeInfo.elapsed}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          ${app.amount_usd}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div>{new Date(app.entry_date).toLocaleDateString()}</div>
                          <div className="text-gray-400">to {new Date(app.exit_date).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(app.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateFilters("page", (currentPage - 1).toString())}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => updateFilters("page", (currentPage + 1).toString())}
                    disabled={currentPage >= pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
