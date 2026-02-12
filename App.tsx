import React, { useState } from 'react';
import { AppView, UserRole, BookingData, Order, Customer, Requirement, ServicePackage, Subscription, Payment } from './types';
import { PublicHeader, Footer, DashboardLayout } from './components/Layout';
import { Home, Services, ServiceDetail, Pricing, About, Contact, FAQPage } from './components/PublicPages';
import { UserPanelRouter } from './components/UserPanel';
import { AdminPanelRouter } from './components/AdminPanel';
import { Auth } from './components/Auth';
import { MOCK_ORDERS, MOCK_CUSTOMERS, MOCK_REQUIREMENTS, SERVICES, MOCK_SUBSCRIPTIONS, MOCK_PAYMENTS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  
  // --- CENTRALIZED STATE (DATABASE) ---
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [requirements, setRequirements] = useState<Requirement[]>(MOCK_REQUIREMENTS);
  const [services, setServices] = useState<ServicePackage[]>(SERVICES);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(MOCK_SUBSCRIPTIONS);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);

  // --- ACTIONS ---
  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);
  const updateOrder = (order: Order) => setOrders(prev => prev.map(o => o.id === order.id ? order : o));
  
  const addCustomer = (customer: Customer) => setCustomers(prev => [...prev, customer]);
  const updateCustomer = (customer: Customer) => setCustomers(prev => prev.map(c => c.id === customer.id ? customer : c));
  const deleteCustomer = (id: string) => setCustomers(prev => prev.filter(c => c.id !== id));

  const addRequirement = (req: Requirement) => setRequirements(prev => [req, ...prev]);
  const updateRequirement = (id: string, status: any) => setRequirements(prev => prev.map(r => r.id === id ? { ...r, status } : r));

  const addService = (service: ServicePackage) => setServices(prev => [...prev, service]);
  const updateService = (service: ServicePackage) => setServices(prev => prev.map(s => s.id === service.id ? service : s));
  const deleteService = (id: string) => setServices(prev => prev.filter(s => s.id !== id));

  // Booking State (Local to user session flow)
  const [bookingData, setBookingData] = useState<BookingData>({});

  // Mock Authentication
  const login = (role: UserRole) => {
    setUserRole(role);
    setCurrentView(role === UserRole.ADMIN ? AppView.ADMIN_DASHBOARD : AppView.USER_DASHBOARD);
  };

  const logout = () => {
    setUserRole(UserRole.GUEST);
    setCurrentView(AppView.HOME);
    setBookingData({});
  };

  const sharedProps = {
    orders, customers, requirements, services, subscriptions, payments,
    addOrder, updateOrder, addCustomer, updateCustomer, deleteCustomer,
    addRequirement, updateRequirement, addService, updateService, deleteService
  };

  const renderContent = () => {
    switch (currentView) {
      // Public Pages
      case AppView.HOME: return <Home setView={setCurrentView} />;
      case AppView.SERVICES: return <Services setView={setCurrentView} setSelectedServiceId={setSelectedServiceId} />;
      case AppView.SERVICE_DETAIL: return <ServiceDetail setView={setCurrentView} selectedServiceId={selectedServiceId} />;
      case AppView.PRICING: return <Pricing setView={setCurrentView} />;
      case AppView.ABOUT: return <About />;
      case AppView.CONTACT: return <Contact />;
      case AppView.FAQ: return <FAQPage />;
      
      // Auth
      case AppView.LOGIN: 
      case AppView.SIGNUP: 
      case AppView.ADMIN_LOGIN:
        return <Auth view={currentView} onLogin={login} setView={setCurrentView} />;

      // User Dashboard Views
      case AppView.USER_DASHBOARD:
      case AppView.USER_PROFILE:
      case AppView.USER_SERVICE_SELECTION:
      case AppView.USER_REQUIREMENTS:
      case AppView.USER_ORDER_SUMMARY:
      case AppView.USER_PAYMENT:
      case AppView.USER_CONFIRMATION:
      case AppView.USER_TRACKING:
      case AppView.USER_SUBSCRIPTION:
      case AppView.USER_AI_TOOLS:
        return (
          <DashboardLayout title={getDashboardTitle(currentView)} view={currentView} setView={setCurrentView} role={UserRole.USER} logout={logout}>
            <UserPanelRouter 
              view={currentView} 
              setView={setCurrentView} 
              bookingData={bookingData} 
              setBookingData={setBookingData}
              sharedState={sharedProps}
            />
          </DashboardLayout>
        );

      // Admin Dashboard
      case AppView.ADMIN_DASHBOARD:
      case AppView.ADMIN_CUSTOMERS:
      case AppView.ADMIN_ORDERS:
      case AppView.ADMIN_REQUIREMENTS:
      case AppView.ADMIN_SUBSCRIPTIONS:
      case AppView.ADMIN_PAYMENTS:
      case AppView.ADMIN_SERVICES:
        return (
          <DashboardLayout title={getDashboardTitle(currentView)} view={currentView} setView={setCurrentView} role={UserRole.ADMIN} logout={logout}>
            <AdminPanelRouter 
              view={currentView} 
              setView={setCurrentView} 
              sharedState={sharedProps}
            />
          </DashboardLayout>
        );

      default: return <Home setView={setCurrentView} />;
    }
  };

  // Helper to change title based on view
  const getDashboardTitle = (view: AppView) => {
    switch(view) {
      // User
      case AppView.USER_PROFILE: return "Concierge Profile";
      case AppView.USER_SERVICE_SELECTION: return "Select Collection";
      case AppView.USER_REQUIREMENTS: return "Briefing";
      case AppView.USER_ORDER_SUMMARY: return "Review Order";
      case AppView.USER_PAYMENT: return "Secure Checkout";
      case AppView.USER_CONFIRMATION: return "Order Confirmed";
      case AppView.USER_SUBSCRIPTION: return "Membership Upgrade";
      case AppView.USER_TRACKING: return "Tracking";
      case AppView.USER_AI_TOOLS: return "AI Studio";
      // Admin
      case AppView.ADMIN_DASHBOARD: return "Executive Overview";
      case AppView.ADMIN_CUSTOMERS: return "Clientele Management";
      case AppView.ADMIN_ORDERS: return "Order Management";
      case AppView.ADMIN_REQUIREMENTS: return "Concierge Requests";
      case AppView.ADMIN_SUBSCRIPTIONS: return "Subscriptions";
      case AppView.ADMIN_PAYMENTS: return "Financials";
      case AppView.ADMIN_SERVICES: return "Service Collections";
      default: return "Dashboard";
    }
  };

  // If dashboard, don't show public header/footer
  const isDashboard = currentView.toString().startsWith('USER_') || currentView.toString().startsWith('ADMIN_');

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <PublicHeader currentView={currentView} setView={setCurrentView} userRole={userRole} logout={logout} />}
      <div className="flex-grow">
        {renderContent()}
      </div>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default App;