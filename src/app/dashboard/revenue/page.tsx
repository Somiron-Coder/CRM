'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RevenuePage() {
  const [revenues, setRevenues] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    clientId: '',
    amount: '',
    currency: 'USD',
    description: '',
    date: '',
    status: 'pending',
    paymentMethod: '',
    invoiceNumber: '',
    dueDate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [revenueRes, clientsRes] = await Promise.all([
        axios.get('/api/revenue'),
        axios.get('/api/clients'),
      ]);
      setRevenues(Array.isArray(revenueRes.data) ? revenueRes.data : []);
      setClients(Array.isArray(clientsRes.data) ? clientsRes.data : []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/revenue/${editingId}`, formData);
      } else {
        await axios.post('/api/revenue', formData);
      }
      setFormData({
        clientId: '',
        amount: '',
        currency: 'USD',
        description: '',
        date: '',
        status: 'pending',
        paymentMethod: '',
        invoiceNumber: '',
        dueDate: '',
      });
      setShowModal(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      alert('Failed to save revenue record');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/revenue/${id}`);
        fetchData();
      } catch (error) {
        alert('Failed to delete revenue record');
      }
    }
  };

  const handleEdit = (revenue: any) => {
    setFormData(revenue);
    setEditingId(revenue._id);
    setShowModal(true);
  };

  const totalRevenue = revenues.reduce((sum, r) => sum + (r.amount || 0), 0);
  const completedRevenue = revenues
    .filter((r) => r.status === 'completed')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Revenue Management</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              clientId: '',
              amount: '',
              currency: 'USD',
              description: '',
              date: '',
              status: 'pending',
              paymentMethod: '',
              invoiceNumber: '',
              dueDate: '',
            });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Revenue
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold mt-2">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-3xl font-bold mt-2">${completedRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-3xl font-bold mt-2">
            ${(totalRevenue - completedRevenue).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Revenue Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : revenues.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No revenue records found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Invoice</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Client</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {revenues.map((revenue) => {
                const client = clients.find((c) => c._id === revenue.clientId);
                return (
                  <tr key={revenue._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{revenue.invoiceNumber}</td>
                    <td className="px-6 py-4 text-sm">{client?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm font-semibold">
                      ${revenue.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(revenue.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        revenue.status === 'completed' ? 'bg-green-100 text-green-800' :
                        revenue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {revenue.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(revenue)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(revenue._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit Revenue' : 'Add New Revenue'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <select
                  required
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  className="col-span-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <input
                  type="text"
                  placeholder="Invoice Number"
                  required
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  className="col-span-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  placeholder="Due Date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="col-span-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <input
                  type="text"
                  placeholder="Payment Method"
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="col-span-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="col-span-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
