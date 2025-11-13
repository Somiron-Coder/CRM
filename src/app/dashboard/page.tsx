'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, UserCheck, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    employees: 0,
    revenue: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
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

        // Sample chart data - in real app, this would be calculated from actual data
        setChartData([
          { name: 'Jan', revenue: 4000, clients: 12, employees: 5 },
          { name: 'Feb', revenue: 5200, clients: 15, employees: 6 },
          { name: 'Mar', revenue: 6800, clients: 18, employees: 7 },
          { name: 'Apr', revenue: 7400, clients: 22, employees: 8 },
          { name: 'May', revenue: 8900, clients: 25, employees: 9 },
          { name: 'Jun', revenue: 9800, clients: 28, employees: 10 },
        ]);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
    <Card className="border-0 shadow-sm hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">{label}</CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900">{loading ? '-' : value}</div>
        <p className="text-xs text-green-600 mt-2">↑ {trend}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          icon={Users} 
          label="Total Clients" 
          value={stats.clients}
          trend="12% from last month"
          color="bg-blue-500"
        />
        <StatCard 
          icon={UserCheck} 
          label="Team Members" 
          value={stats.employees}
          trend="All active"
          color="bg-green-500"
        />
        <StatCard 
          icon={DollarSign} 
          label="Total Revenue" 
          value={`$${stats.revenue.toLocaleString()}`}
          trend="8% from last month"
          color="bg-purple-500"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Growth Rate" 
          value="18.5%"
          trend="5% improvement"
          color="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Client Growth */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Client Growth</CardTitle>
            <CardDescription>New clients acquired each month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clients" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Employee Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Team Size Growth</CardTitle>
            <CardDescription>Employee count trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="employees" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Business Metrics */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
            <CardDescription>Performance overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600 font-medium">Avg Client Value</span>
              <span className="text-2xl font-bold text-slate-900">$450</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600 font-medium">Active Projects</span>
              <span className="text-2xl font-bold text-slate-900">24</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600 font-medium">Conversion Rate</span>
              <span className="text-2xl font-bold text-slate-900">68%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600 font-medium">Satisfaction Rate</span>
              <span className="text-2xl font-bold text-slate-900">92%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Navigate to key sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <a
              href="/dashboard/clients"
              className="p-4 border border-slate-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition text-center font-medium text-slate-700 hover:text-blue-600"
            >
              View Clients
            </a>
            <a
              href="/dashboard/clients?action=add"
              className="p-4 border border-slate-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition text-center font-medium text-slate-700 hover:text-green-600"
            >
              Add Client
            </a>
            <a
              href="/dashboard/employees"
              className="p-4 border border-slate-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition text-center font-medium text-slate-700 hover:text-purple-600"
            >
              View Employees
            </a>
            <a
              href="/dashboard/revenue"
              className="p-4 border border-slate-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition text-center font-medium text-slate-700 hover:text-orange-600"
            >
              View Revenue
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
