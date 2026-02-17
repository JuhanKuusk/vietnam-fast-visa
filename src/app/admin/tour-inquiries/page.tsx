"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface TourInquiry {
  id: string;
  inquiry_number: string;
  tour_id: string;
  tour_name: string;
  tour_category: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  nationality: string | null;
  preferred_date: string | null;
  number_of_adults: number;
  number_of_children: number;
  special_requests: string | null;
  status: string;
  referred_to_affiliate: boolean;
  created_at: string;
  contacted_at: string | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  booked: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const categoryColors: Record<string, string> = {
  cruise: "bg-cyan-100 text-cyan-800",
  "day-trip": "bg-purple-100 text-purple-800",
  "multi-day": "bg-orange-100 text-orange-800",
};

export default function TourInquiriesPage() {
  const [inquiries, setInquiries] = useState<TourInquiry[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentStatus = searchParams.get("status") || "";
  const currentSearch = searchParams.get("search") || "";

  const fetchInquiries = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", currentPage.toString());
      params.set("limit", "20");
      if (currentStatus) params.set("status", currentStatus);
      if (currentSearch) params.set("search", currentSearch);

      const response = await fetch(`/api/admin/tour-inquiries?${params}`);
      if (response.ok) {
        const data = await response.json();
        setInquiries(data.inquiries || []);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch tour inquiries:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentStatus, currentSearch]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchInquiries(false);
    }, 30000);
    return () => clearInterval(refreshInterval);
  }, [fetchInquiries]);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") params.set("page", "1");
    router.push(`/admin/tour-inquiries?${params.toString()}`);
  };

  const updateStatus = async (inquiryId: string, newStatus: string) => {
    setUpdating(inquiryId);
    try {
      const response = await fetch(`/api/admin/tour-inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchInquiries(false);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tour Inquiries</h1>
        <p className="text-gray-600 mt-1">Manage tour booking inquiries from vietnamtravel.help</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by name, email, or inquiry number..."
              defaultValue={currentSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateFilters("search", e.currentTarget.value);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
            />
          </div>

          <select
            value={currentStatus}
            onChange={(e) => updateFilters("status", e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            onClick={() => fetchInquiries()}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-cyan-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiry #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travelers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                        No tour inquiries found
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((inquiry) => (
                      <tr key={inquiry.id} className={inquiry.status === "new" ? "bg-cyan-50" : "hover:bg-gray-50"}>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-medium text-cyan-600">
                            {inquiry.inquiry_number}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{inquiry.tour_name}</div>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${categoryColors[inquiry.tour_category] || "bg-gray-100 text-gray-800"}`}>
                              {inquiry.tour_category}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{inquiry.full_name}</div>
                            {inquiry.nationality && (
                              <div className="text-gray-500">{inquiry.nationality}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-gray-900">{inquiry.email}</div>
                            <div className="text-gray-500">{inquiry.phone}</div>
                            {inquiry.whatsapp && (
                              <a
                                href={`https://wa.me/${inquiry.whatsapp.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:underline text-xs"
                              >
                                WhatsApp
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {inquiry.number_of_adults} adult{inquiry.number_of_adults !== 1 ? "s" : ""}
                          {inquiry.number_of_children > 0 && (
                            <span className="text-gray-500">
                              , {inquiry.number_of_children} child{inquiry.number_of_children !== 1 ? "ren" : ""}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {inquiry.preferred_date ? formatDate(inquiry.preferred_date) : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[inquiry.status] || "bg-gray-100 text-gray-800"}`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDateTime(inquiry.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={inquiry.status}
                              onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                              disabled={updating === inquiry.id}
                              className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none disabled:opacity-50"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="booked">Booked</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            {inquiry.special_requests && (
                              <button
                                onClick={() => alert(inquiry.special_requests)}
                                className="text-gray-400 hover:text-gray-600"
                                title="View special requests"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

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
