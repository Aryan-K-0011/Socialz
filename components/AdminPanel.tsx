import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MoreVertical, Check, X as XIcon, Clock, Search, Filter, Eye, Edit2, Plus, Download, ChevronRight, AlertCircle, Trash2, Save, FileText } from 'lucide-react';
import { AppView, Order, Customer, ServicePackage, Requirement, SharedStateProps } from '../types';

const data = [
  { name: 'Jan', orders: 40 },
  { name: 'Feb', orders: 30 },
  { name: 'Mar', orders: 20 },
  { name: 'Apr', orders: 27 },
  { name: 'May', orders: 18 },
  { name: 'Jun', orders: 23 },
  { name: 'Jul', orders: 34 },
];

// --- MAIN ROUTER & STATE HOLDER ---
export const AdminPanelRouter = ({ view, setView, sharedState }: { view: AppView, setView: (v: AppView) => void, sharedState: SharedStateProps }) => {
  
  switch (view) {
    case AppView.ADMIN_DASHBOARD: return <AdminDashboardHome setView={setView} stats={{ orders: sharedState.orders.length, customers: sharedState.customers.length }} />;
    case AppView.ADMIN_CUSTOMERS: return <CustomerManagement customers={sharedState.customers} setCustomers={sharedState.updateCustomer} onDelete={sharedState.deleteCustomer} />;
    case AppView.ADMIN_ORDERS: return <OrderManagement orders={sharedState.orders} onUpdateOrder={sharedState.updateOrder} />;
    case AppView.ADMIN_REQUIREMENTS: return <RequirementReview requirements={sharedState.requirements} onUpdateStatus={sharedState.updateRequirement} />;
    case AppView.ADMIN_SUBSCRIPTIONS: return <SubscriptionTracking subscriptions={sharedState.subscriptions} />;
    case AppView.ADMIN_PAYMENTS: return <PaymentManagement payments={sharedState.payments} />;
    case AppView.ADMIN_SERVICES: return <ServicePackageManagement services={sharedState.services} onAdd={sharedState.addService} onUpdate={sharedState.updateService} onDelete={sharedState.deleteService} />;
    default: return <AdminDashboardHome setView={setView} stats={{ orders: sharedState.orders.length, customers: sharedState.customers.length }} />;
  }
};

export const AdminDashboardHome = ({ setView, stats }: { setView: (v: AppView) => void, stats: any }) => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$12,450', color: 'text-emerald-700' },
          { label: 'Active Clients', value: stats.customers.toString(), color: 'text-stone-900' },
          { label: 'Monthly Growth', value: '+12%', color: 'text-amber-600' },
          { label: 'Pending Requests', value: '5', color: 'text-stone-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-8 border border-stone-200 shadow-sm hover:border-amber-500 transition-colors">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">{stat.label}</p>
            <p className={`text-4xl font-serif font-bold mt-3 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 border border-stone-200 shadow-sm h-96">
          <h3 className="text-lg font-serif font-bold text-stone-900 mb-6">Monthly Volume</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 12}} />
              <Tooltip cursor={{fill: '#f5f5f4'}} contentStyle={{backgroundColor: '#1c1917', border: 'none', color: '#fff'}} itemStyle={{color: '#fff'}} />
              <Bar dataKey="orders" fill="#1c1917" radius={[2, 2, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-8 border border-stone-200 shadow-sm h-96">
          <h3 className="text-lg font-serif font-bold text-stone-900 mb-6">Growth Trend</h3>
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 12}} />
              <Tooltip contentStyle={{backgroundColor: '#1c1917', border: 'none', color: '#fff'}} itemStyle={{color: '#fff'}} />
              <Line type="monotone" dataKey="orders" stroke="#d97706" strokeWidth={3} dot={{ r: 4, fill: '#fff', stroke: '#d97706', strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <button onClick={() => setView(AppView.ADMIN_REQUIREMENTS)} className="flex items-center justify-between bg-white p-6 border border-stone-200 group hover:bg-stone-50">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900">Review New Requests</span>
            <ChevronRight className="text-stone-400 group-hover:text-amber-600 transition" />
         </button>
         <button onClick={() => setView(AppView.ADMIN_ORDERS)} className="flex items-center justify-between bg-white p-6 border border-stone-200 group hover:bg-stone-50">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900">Manage Orders</span>
            <ChevronRight className="text-stone-400 group-hover:text-amber-600 transition" />
         </button>
         <button onClick={() => setView(AppView.ADMIN_SERVICES)} className="flex items-center justify-between bg-white p-6 border border-stone-200 group hover:bg-stone-50">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900">Edit Packages</span>
            <ChevronRight className="text-stone-400 group-hover:text-amber-600 transition" />
         </button>
      </div>
    </div>
  );
};

export const CustomerManagement = ({ customers, onDelete, setCustomers }: { customers: Customer[], onDelete: (id: string) => void, setCustomers: (c: Customer) => void }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleStatus = (customer: Customer) => {
    setCustomers({ ...customer, status: customer.status === 'Active' ? 'Inactive' : 'Active' });
    setOpenMenuId(null);
  };

  return (
    <div className="bg-white border border-stone-200 shadow-sm animate-fade-in-up">
      <div className="p-8 border-b border-stone-100 flex justify-between items-center">
        <h3 className="text-xl font-serif font-bold text-stone-900">Clientele</h3>
        <div className="flex space-x-4">
           <div className="relative">
              <input type="text" placeholder="Search Clients" className="pl-10 pr-4 py-2 border border-stone-200 text-sm focus:outline-none focus:border-stone-900 transition-colors" />
              <Search className="absolute left-3 top-2.5 text-stone-400" size={16} />
           </div>
        </div>
      </div>
      <div className="overflow-visible min-h-[400px]">
        <table className="min-w-full divide-y divide-stone-100">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Name</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Company</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Join Date</th>
              <th className="px-8 py-4 text-right text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-stone-50">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-stone-50 transition-colors relative">
                <td className="px-8 py-5 text-sm font-medium text-stone-900">{customer.name}</td>
                <td className="px-8 py-5 text-sm text-stone-500">{customer.company}</td>
                <td className="px-8 py-5">
                  <span className={`px-2 py-1 inline-flex text-[10px] leading-5 font-bold uppercase tracking-widest border
                    ${customer.status === 'Active' ? 'bg-emerald-50 text-emerald-900 border-emerald-100' : 'bg-stone-100 text-stone-500 border-stone-200'}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-sm text-stone-500">{customer.joinDate}</td>
                <td className="px-8 py-5 text-right relative">
                  <button onClick={() => setOpenMenuId(openMenuId === customer.id ? null : customer.id)} className="text-stone-400 hover:text-stone-900 transition-colors p-2">
                    <MoreVertical size={18} />
                  </button>
                  {/* Action Menu */}
                  {openMenuId === customer.id && (
                    <div className="absolute right-8 top-12 w-48 bg-white border border-stone-200 shadow-xl z-50 animate-fade-in-up">
                      <button onClick={() => toggleStatus(customer)} className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-50 flex items-center">
                         <Edit2 size={14} className="mr-3" /> Toggle Status
                      </button>
                      <button onClick={() => onDelete(customer.id)} className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 flex items-center border-t border-stone-100">
                         <Trash2 size={14} className="mr-3" /> Remove Client
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const OrderManagement = ({ orders, onUpdateOrder }: { orders: Order[], onUpdateOrder: (o: Order) => void }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Temporary state for the modal
  const [modalStatus, setModalStatus] = useState<string>('');
  const [timelineEntry, setTimelineEntry] = useState('');

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setModalStatus(order.status);
    setTimelineEntry('');
  };

  const handleSave = () => {
    if (!selectedOrder) return;
    
    let updatedOrder = { ...selectedOrder, status: modalStatus as any };
    
    if (timelineEntry) {
      const newTimeline = [...(updatedOrder.timeline || []), { 
        title: timelineEntry, 
        date: new Date().toLocaleDateString(), 
        completed: true 
      }];
      updatedOrder.timeline = newTimeline;
    }

    onUpdateOrder(updatedOrder);
    setSelectedOrder(null);
  };

  return (
    <div className="bg-white border border-stone-200 shadow-sm animate-fade-in-up relative">
      <div className="p-8 border-b border-stone-100 flex justify-between items-center">
        <h3 className="text-xl font-serif font-bold text-stone-900">Order Management</h3>
      </div>
      <table className="min-w-full divide-y divide-stone-100">
        <thead className="bg-stone-50">
          <tr>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Order ID</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Client</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Service</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Status</th>
            <th className="px-8 py-4 text-right text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Update</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-stone-50">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-stone-50 transition-colors">
              <td className="px-8 py-5 text-sm font-bold text-stone-900">#{order.id}</td>
              <td className="px-8 py-5 text-sm text-stone-600">{order.customerName}</td>
              <td className="px-8 py-5 text-sm text-stone-500">{order.service}</td>
              <td className="px-8 py-5">
                <span className={`px-2 py-1 inline-flex text-[10px] leading-5 font-bold uppercase tracking-widest border
                  ${order.status === 'Completed' ? 'bg-emerald-50 text-emerald-900 border-emerald-100' : 
                    order.status === 'In Progress' ? 'bg-amber-50 text-amber-900 border-amber-100' : 
                    'bg-stone-100 text-stone-500 border-stone-200'}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-8 py-5 text-right">
                <button onClick={() => openModal(order)} className="text-stone-900 hover:text-amber-600 text-xs font-bold uppercase tracking-widest border border-stone-200 px-3 py-1 hover:border-amber-600 transition-colors">
                  Manage Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {selectedOrder && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl border border-stone-200 shadow-2xl p-10 animate-fade-in-up">
               <div className="flex justify-between items-start mb-8 border-b border-stone-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Updating Order</span>
                    <h2 className="text-3xl font-serif font-bold text-stone-900 mt-2">#{selectedOrder.id} - {selectedOrder.customerName}</h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)}><XIcon className="text-stone-400 hover:text-stone-900" /></button>
               </div>

               <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Change Status</label>
                    <select value={modalStatus} onChange={(e) => setModalStatus(e.target.value)} className="w-full border-b border-stone-200 py-2 bg-transparent text-stone-900 font-serif text-lg focus:outline-none">
                       <option value="Pending">Pending</option>
                       <option value="In Progress">In Progress</option>
                       <option value="Completed">Completed</option>
                       <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Add Timeline Entry</label>
                    <div className="flex space-x-2">
                       <input 
                          type="text" 
                          placeholder="e.g. Content Approved" 
                          className="flex-1 border-b border-stone-200 py-2 bg-transparent text-sm focus:outline-none"
                          value={timelineEntry}
                          onChange={(e) => setTimelineEntry(e.target.value)}
                       />
                    </div>
                  </div>
               </div>

               <div className="bg-stone-50 p-6 border border-stone-100 max-h-40 overflow-y-auto">
                  <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Current Timeline</h4>
                  <div className="space-y-4">
                     {selectedOrder.timeline?.map((t, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                           <span className="font-serif text-stone-700">{t.title}</span>
                           <span className="text-stone-400 text-xs uppercase tracking-widest">{t.date}</span>
                        </div>
                     ))}
                     {selectedOrder.timeline?.length === 0 && <p className="text-stone-400 text-xs italic">No timeline events yet.</p>}
                  </div>
               </div>

               <div className="mt-8 pt-6 border-t border-stone-100 text-right">
                  <button onClick={handleSave} className="bg-amber-600 text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-700 transition flex items-center inline-flex">
                     <Save size={16} className="mr-2" /> Save Updates
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export const RequirementReview = ({ requirements, onUpdateStatus }: { requirements: Requirement[], onUpdateStatus: (id: string, s: 'Reviewed' | 'Needs Info') => void }) => {
  return (
    <div className="bg-white border border-stone-200 shadow-sm animate-fade-in-up">
      <div className="p-8 border-b border-stone-100">
        <h3 className="text-xl font-serif font-bold text-stone-900">Concierge Requests</h3>
      </div>
      <div className="divide-y divide-stone-100">
         {requirements.map((req) => (
            <div key={req.id} className="p-8 hover:bg-stone-50 transition-colors">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-1 block">{req.serviceName}</span>
                     <h4 className="text-lg font-serif font-bold text-stone-900">{req.customerName}</h4>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border 
                     ${req.status === 'Reviewed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-stone-100 text-stone-500 border-stone-200'}`}>
                     {req.status}
                  </span>
               </div>
               <div className="grid grid-cols-2 gap-6 text-sm text-stone-600 mb-6">
                  <div>
                     <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Aesthetic</p>
                     <p>{req.details.aesthetic}</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Objectives</p>
                     <p>{req.details.objectives}</p>
                  </div>
                  {req.details.brandAssets && (
                    <div className="col-span-2">
                       <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Assets</p>
                       <p className="text-amber-600 flex items-center"><FileText size={14} className="mr-2"/> {req.details.brandAssets}</p>
                    </div>
                  )}
               </div>
               <div className="flex space-x-4">
                  <button 
                     onClick={() => onUpdateStatus(req.id, 'Reviewed')} 
                     disabled={req.status === 'Reviewed'}
                     className={`px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors
                     ${req.status === 'Reviewed' ? 'bg-stone-200 text-stone-400 cursor-not-allowed' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
                  >
                     {req.status === 'Reviewed' ? 'Approved' : 'Approve Brief'}
                  </button>
                  <button 
                     onClick={() => onUpdateStatus(req.id, 'Needs Info')}
                     className="px-6 py-2 border border-stone-200 text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:border-amber-600 hover:text-amber-600"
                  >
                     Request Info
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export const SubscriptionTracking = ({ subscriptions }: { subscriptions: any[] }) => {
  const handleDownload = () => {
    // Generate CSV content
    const headers = "ID,Client,Plan,Amount,Billing Cycle,Next Billing,Status\n";
    const rows = subscriptions.map(sub => 
      `${sub.id},${sub.customerName},${sub.plan},${sub.amount},${sub.billingCycle},${sub.nextBilling},${sub.status}`
    ).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    
    // Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "socialz_subscriptions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-stone-200 shadow-sm animate-fade-in-up">
       <div className="p-8 border-b border-stone-100 flex justify-between items-center">
        <h3 className="text-xl font-serif font-bold text-stone-900">Active Memberships</h3>
        <button onClick={handleDownload} className="text-stone-400 hover:text-stone-900 flex items-center text-xs font-bold uppercase tracking-widest">
           <Download size={16} className="mr-2" /> Export CSV
        </button>
      </div>
      <table className="min-w-full divide-y divide-stone-100">
        <thead className="bg-stone-50">
          <tr>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Client</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Plan</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Billing</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Next Bill</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-stone-50">
          {subscriptions.map((sub) => (
            <tr key={sub.id} className="hover:bg-stone-50 transition-colors">
              <td className="px-8 py-5 text-sm font-medium text-stone-900">{sub.customerName}</td>
              <td className="px-8 py-5 text-sm text-stone-500">{sub.plan}</td>
              <td className="px-8 py-5 text-sm text-stone-500">${sub.amount} / {sub.billingCycle}</td>
              <td className="px-8 py-5 text-sm text-stone-500">{sub.nextBilling}</td>
              <td className="px-8 py-5">
                 <span className={`px-2 py-1 inline-flex text-[10px] leading-5 font-bold uppercase tracking-widest border
                  ${sub.status === 'Active' ? 'bg-emerald-50 text-emerald-900 border-emerald-100' : 'bg-red-50 text-red-900 border-red-100'}`}>
                  {sub.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const PaymentManagement = ({ payments }: { payments: any[] }) => {
   return (
    <div className="bg-white border border-stone-200 shadow-sm animate-fade-in-up">
       <div className="p-8 border-b border-stone-100">
        <h3 className="text-xl font-serif font-bold text-stone-900">Financial Ledger</h3>
      </div>
      <table className="min-w-full divide-y divide-stone-100">
        <thead className="bg-stone-50">
          <tr>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Transaction ID</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Client</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Amount</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Date</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Method</th>
            <th className="px-8 py-4 text-left text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-stone-50">
          {payments.map((pay) => (
            <tr key={pay.id} className="hover:bg-stone-50 transition-colors">
              <td className="px-8 py-5 text-sm font-mono text-stone-400">#{pay.id.toUpperCase()}</td>
              <td className="px-8 py-5 text-sm font-medium text-stone-900">{pay.customerName}</td>
              <td className="px-8 py-5 text-sm font-serif text-stone-900">${pay.amount}.00</td>
              <td className="px-8 py-5 text-sm text-stone-500">{pay.date}</td>
              <td className="px-8 py-5 text-sm text-stone-500">{pay.method}</td>
              <td className="px-8 py-5">
                 <span className={`px-2 py-1 inline-flex text-[10px] leading-5 font-bold uppercase tracking-widest border
                  ${pay.status === 'Succeeded' ? 'bg-emerald-50 text-emerald-900 border-emerald-100' : 'bg-red-50 text-red-900 border-red-100'}`}>
                  {pay.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   );
};

export const ServicePackageManagement = ({ services, onAdd, onUpdate, onDelete }: { services: ServicePackage[], onAdd: (s: ServicePackage) => void, onUpdate: (s: ServicePackage) => void, onDelete: (id: string) => void }) => {
   const [modalOpen, setModalOpen] = useState(false);
   const [editMode, setEditMode] = useState(false);
   const [currentService, setCurrentService] = useState<Partial<ServicePackage>>({});

   const handleOpenModal = (service?: ServicePackage) => {
      if (service) {
         setEditMode(true);
         setCurrentService({ ...service });
      } else {
         setEditMode(false);
         setCurrentService({
            id: `s${Date.now()}`,
            title: '',
            price: 0,
            category: 'Startup',
            description: '',
            features: ['Feature 1', 'Feature 2'],
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop', // Default image
            deliverables: [],
            premiumPerks: [],
            strategy: '',
            idealFor: [],
            process: []
         });
      }
      setModalOpen(true);
   };

   const handleSave = () => {
      if (!currentService.title || !currentService.price) return; // Basic Validation

      if (editMode) {
         onUpdate(currentService as ServicePackage);
      } else {
         onAdd(currentService as ServicePackage);
      }
      setModalOpen(false);
   };

   return (
      <div className="animate-fade-in-up">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
               <div key={service.id} className="bg-white p-8 border border-stone-200 group hover:border-amber-500 transition-all relative">
                  <div className="flex justify-between items-start mb-6">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 bg-amber-50 px-2 py-1">{service.category}</span>
                     <div className="flex space-x-2">
                        <button onClick={() => handleOpenModal(service)} className="text-stone-400 hover:text-stone-900 bg-stone-50 p-2 rounded-full"><Edit2 size={16} /></button>
                        <button onClick={() => onDelete(service.id)} className="text-stone-400 hover:text-red-600 bg-stone-50 p-2 rounded-full"><Trash2 size={16} /></button>
                     </div>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-stone-500 mb-6 line-clamp-2 h-10">{service.description}</p>
                  <div className="flex justify-between items-center border-t border-stone-100 pt-6">
                     <span className="font-serif text-xl text-stone-900">${service.price}</span>
                     <span className="text-xs font-bold uppercase tracking-widest text-stone-400">{service.features.length} Features</span>
                  </div>
               </div>
            ))}
            
            {/* Add New Card */}
            <div onClick={() => handleOpenModal()} className="border-2 border-dashed border-stone-200 flex flex-col items-center justify-center p-8 text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-colors cursor-pointer min-h-[250px] bg-stone-50/50">
               <Plus size={32} strokeWidth={1} className="mb-4" />
               <span className="text-xs font-bold uppercase tracking-[0.2em]">Create New Collection</span>
            </div>
         </div>

         {/* Add/Edit Modal */}
         {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
               <div className="bg-white w-full max-w-2xl border border-stone-200 shadow-2xl p-10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-8 border-b border-stone-100 pb-4">
                     <div>
                       <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">{editMode ? 'Editing Collection' : 'New Collection'}</span>
                       <h2 className="text-3xl font-serif font-bold text-stone-900 mt-2">{editMode ? currentService.title : 'Create Package'}</h2>
                     </div>
                     <button onClick={() => setModalOpen(false)}><XIcon className="text-stone-400 hover:text-stone-900" /></button>
                  </div>

                  <div className="space-y-6">
                     <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2">Package Title</label>
                           <input 
                              value={currentService.title} 
                              onChange={(e) => setCurrentService({...currentService, title: e.target.value})}
                              className="w-full border-b border-stone-200 py-2 bg-transparent text-stone-900 font-serif text-lg focus:outline-none" 
                              placeholder="e.g. The Apex"
                           />
                        </div>
                        <div>
                           <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2">Price ($)</label>
                           <input 
                              type="number"
                              value={currentService.price} 
                              onChange={(e) => setCurrentService({...currentService, price: Number(e.target.value)})}
                              className="w-full border-b border-stone-200 py-2 bg-transparent text-stone-900 font-serif text-lg focus:outline-none" 
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2">Category</label>
                        <select 
                           value={currentService.category} 
                           onChange={(e) => setCurrentService({...currentService, category: e.target.value as any})}
                           className="w-full border-b border-stone-200 py-2 bg-transparent text-stone-900 text-sm focus:outline-none"
                        >
                           <option value="Startup">Startup</option>
                           <option value="Cafe">Cafe</option>
                           <option value="Influencer">Influencer</option>
                           <option value="Wedding">Wedding</option>
                           <option value="Real Estate">Real Estate</option>
                           <option value="E-Commerce">E-Commerce</option>
                           <option value="Wellness">Wellness</option>
                           <option value="Corporate">Corporate</option>
                        </select>
                     </div>

                     <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2">Description</label>
                        <textarea 
                           value={currentService.description} 
                           onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                           rows={3}
                           className="w-full border border-stone-200 p-3 bg-transparent text-stone-900 text-sm focus:outline-none resize-none" 
                           placeholder="Short marketing description..."
                        />
                     </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-stone-100 text-right">
                     <button onClick={handleSave} className="bg-stone-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition flex items-center inline-flex">
                        <Save size={16} className="mr-2" /> Save Package
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};