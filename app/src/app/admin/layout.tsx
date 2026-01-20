"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { AdminSidebar } from "@/components/admin/sidebar";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdmin();
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading) {
      if (!user && !isLoginPage) {
        router.push("/admin/login");
      } else if (user && isLoginPage) {
        router.push("/admin/dashboard");
      }
    }
  }, [user, loading, isLoginPage, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Login page layout (no sidebar)
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Protected pages layout (with sidebar)
  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}
