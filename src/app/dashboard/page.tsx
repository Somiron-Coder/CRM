'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    employees: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientsRes, employeesRes, revenueRes] = await Promise.all([
          fetch('/api/clients'),
          fetch('/api/employees'),
          fetch('/api/revenue'),
        ]);

        const clients = await clientsRes.json();
        const employees = await employeesRes.json();
        const revenue = await revenueRes.json();

        const totalRevenue = Array.isArray(revenue)
          ? revenue.reduce((sum, r) => sum + (r.amount || 0), 0)
          : 0;

        setStats({
          clients: Array.isArray(clients) ? clients.length : 0,
          employees: Array.isArray(employees) ? employees.length : 0,
          revenue: totalRevenue,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Clients Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Clients</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? '-' : stats.clients}
              </p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.488M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a3 3 0 003-3v-2" />
              </svg>
            </div>
          </div>
          <p className="text-green-600 text-sm mt-4">+12% from last month</p>
        </div>

        {/* Employees Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Team Members</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? '-' : stats.employees}
              </p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.048M7 14H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2h-2" />
              </svg>
            </div>
          </div>
          <p className="text-green-600 text-sm mt-4">All active</p>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? '-' : `$${stats.revenue.toLocaleString()}`}
              </p>
            </div>
            <div className="bg-purple-100 rounded-lg p-3">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-green-600 text-sm mt-4">+8% from last month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/dashboard/clients"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-center"
          >
            <div className="text-blue-600 font-semibold">View Clients</div>
            <p className="text-gray-600 text-sm mt-1">Manage all clients</p>
          </a>
          <a
            href="/dashboard/clients?action=add"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-center"
          >
            <div className="text-blue-600 font-semibold">Add Client</div>
            <p className="text-gray-600 text-sm mt-1">Create new client</p>
          </a>
          <a
            href="/dashboard/employees"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-center"
          >
            <div className="text-blue-600 font-semibold">View Employees</div>
            <p className="text-gray-600 text-sm mt-1">Manage team members</p>
          </a>
          <a
            href="/dashboard/revenue"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-center"
          >
            <div className="text-blue-600 font-semibold">View Revenue</div>
            <p className="text-gray-600 text-sm mt-1">Track payments</p>
          </a>
        </div>
      </div>
    </div>
  );
}
