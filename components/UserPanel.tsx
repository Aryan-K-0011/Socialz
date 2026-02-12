import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, Clock, Sparkles, Copy, Loader2, CreditCard, ChevronRight, Star, ShieldCheck, Download, AlertCircle, FileCheck } from 'lucide-react';
import { SERVICES } from '../constants';
import { generateContentIdeas, generateBio } from '../services/geminiService';
import { AppView, ServicePackage, BookingData, SharedStateProps } from '../types';

interface UserPanelProps {
  view: AppView;
  setView: (view: AppView) => void;
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
  sharedState: SharedStateProps;
}

export const UserPanelRouter: React.FC<UserPanelProps> = ({ view, setView, bookingData, setBookingData, sharedState }) => {
  switch (view) {
    case AppView.USER_DASHBOARD: return <UserDashboardHome setView={setView} sharedState={sharedState} />;
    case AppView.USER_PROFILE: return <UserProfile />;
    case AppView.USER_SERVICE_SELECTION: return <ServiceSelection setView={setView} setBookingData={setBookingData} services={sharedState.services} />;
    case AppView.USER_REQUIREMENTS: return <RequirementsForm setView={setView} setBookingData={setBookingData} bookingData={bookingData} services={sharedState.services} />;
    case AppView.USER_ORDER_SUMMARY: return <OrderSummary setView={setView} bookingData={bookingData} services={sharedState.services} />;
    case AppView.USER_PAYMENT: return <PaymentGateway setView={setView} bookingData={bookingData} sharedState={sharedState} />;
    case AppView.USER_CONFIRMATION: return <PaymentConfirmation setView={setView} />;
    case AppView.USER_TRACKING: return <OrderTracking sharedState={sharedState} />;
    case AppView.USER_SUBSCRIPTION: return <SubscriptionUpgrade setView={setView} />;
    case AppView.USER_AI_TOOLS: return <AiTools />;
    default: return <UserDashboardHome setView={setView} sharedState={sharedState} />;
  }
};

export const UserDashboardHome = ({ setView, sharedState }: { setView: (v: AppView) => void, sharedState: SharedStateProps }) => {
  // Use the last active order for tracking
  const activeOrder = sharedState.orders.find(o => o.customerName === "Marcus Thorne" || o.id.startsWith('ORD-')); 
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Cards */}
      <div className="bg-white p-10 border border-stone-200 relative group cursor-pointer" onClick={() => setView(AppView.USER_TRACKING)}>
        <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Active Plan</h3>
        <p className="text-3xl font-serif font-bold text-stone-900 leading-none group-hover:text-amber-600 transition-colors">
          {activeOrder ? activeOrder.service : "No Active Plan"}
        </p>
        <div className="mt-6 pt-6 border-t border-stone-100 flex items-center text-xs font-medium uppercase tracking-widest text-stone-500">
          <Clock size={14} className="mr-2 text-amber-600" />
          <span>{activeOrder ? 'Active' : 'Browse Collections'}</span>
        </div>
      </div>
      
      <div className="bg-white p-10 border border-stone-200">
        <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Service Status</h3>
        <p className="text-3xl font-serif font-bold text-stone-900 flex items-center leading-none">
          {activeOrder ? (
            <>
               <span className={`w-3 h-3 mr-4 animate-pulse ${activeOrder.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
               {activeOrder.status}
            </>
          ) : (
             <span className="text-stone-400">Inactive</span>
          )}
        </p>
        <div className="mt-6 pt-6 border-t border-stone-100 text-xs font-medium text-stone-500 uppercase tracking-widest">
          {activeOrder && activeOrder.timeline && activeOrder.timeline.length > 0 
            ? `Latest: ${activeOrder.timeline[activeOrder.timeline.length - 1].title}`
            : 'Ready to start?'}
        </div>
      </div>

       <div className="bg-stone-950 p-10 text-white relative overflow-hidden group border border-stone-900 cursor-pointer" onClick={() => setView(AppView.USER_AI_TOOLS)}>
         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
           <Sparkles size={100} strokeWidth={0.5} />
         </div>
        <h3 className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] mb-4">AI Concierge</h3>
        <p className="text-2xl font-serif italic mb-6">"Generate concepts instantly."</p>
        <button className="border border-stone-700 hover:border-white text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition duration-300">
           Open Studio
        </button>
      </div>

      <div className="col-span-1 md:col-span-3 bg-white p-10 border border-stone-200 mt-4">
        <div className="flex justify-between items-end mb-8 border-b border-stone-100 pb-4">
          <h3 className="text-xl font-serif font-bold text-stone-900">Activity Journal</h3>
          <button onClick={() => setView(AppView.USER_TRACKING)} className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900">View Full Timeline</button>
        </div>
        <div className="space-y-8">
           {activeOrder && activeOrder.timeline ? activeOrder.timeline.slice().reverse().map((t, i) => (
             <div key={i} className="flex items-start group">
                <div className="h-12 w-12 border border-stone-200 flex items-center justify-center text-stone-300 mr-6 mt-1 group-hover:border-stone-900 group-hover:text-stone-900 transition-colors">
                  <CheckCircle size={20} strokeWidth={1} />
                </div>
                <div>
                  <p className="text-lg font-serif text-stone-900">{t.title}</p>
                  <p className="text-[10px] text-stone-400 mt-2 uppercase tracking-[0.2em]">{t.date}</p>
                </div>
             </div>
           )) : (
             <p className="text-stone-400 text-sm italic">No recent activity. Book a service to get started.</p>
           )}
        </div>
      </div>
    </div>
  );
};

export const UserProfile = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 border border-stone-200">
      <div className="flex justify-between items-center mb-10 border-b border-stone-100 pb-6">
        <h2 className="text-3xl font-serif font-bold text-stone-900">Member Profile</h2>
        <span className="bg-stone-900 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em]">Active</span>
      </div>
      
      <form className="space-y-10">
         <div className="flex items-center space-x-8 mb-8">
           <div className="h-24 w-24 bg-stone-100 rounded-full flex items-center justify-center text-stone-300 border border-stone-200">
             <span className="font-serif text-4xl">M</span>
           </div>
           <button type="button" className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 hover:text-amber-700">Change Avatar</button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Full Name</label>
              <input type="text" defaultValue="Marcus Thorne" className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Company</label>
              <input type="text" defaultValue="Thorne & Co." className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Email Address</label>
              <input type="email" defaultValue="marcus@thorne.co" className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Phone</label>
              <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" />
            </div>
         </div>
         
         <div>
            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Brand Bio</label>
            <textarea rows={3} defaultValue="Luxury artisanal coffee roasters based in Seattle, focusing on sustainable sourcing." className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg resize-none" />
         </div>

         <div className="pt-8">
           <button type="button" className="px-8 py-4 bg-stone-900 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition">Save Changes</button>
         </div>
      </form>
    </div>
  );
};

export const ServiceSelection = ({ setView, setBookingData, services }: { setView: (v: AppView) => void, setBookingData: any, services: ServicePackage[] }) => {
  const handleSelect = (serviceId: string) => {
    setBookingData((prev: any) => ({ ...prev, serviceId }));
    setView(AppView.USER_REQUIREMENTS);
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Select a Collection</h2>
        <p className="text-stone-500 font-light">Choose the tier that best aligns with your current growth trajectory.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-8 border border-stone-200 hover:border-amber-500 transition-all duration-300 group cursor-pointer" onClick={() => handleSelect(service.id)}>
             <div className="flex justify-between items-start mb-6">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 bg-amber-50 px-2 py-1">{service.category}</span>
               <span className="font-serif text-2xl text-stone-900">${service.price}</span>
             </div>
             <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4 group-hover:text-amber-600 transition-colors">{service.title}</h3>
             <p className="text-stone-500 font-light text-sm mb-6">{service.description}</p>
             <button className="w-full py-3 border border-stone-200 text-xs font-bold uppercase tracking-[0.2em] text-stone-500 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-all">Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RequirementsForm = ({ setView, setBookingData, bookingData, services }: { setView: (v: AppView) => void, setBookingData: any, bookingData: any, services: ServicePackage[] }) => {
  const service = services.find(s => s.id === bookingData.serviceId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Local state for form fields to ensure controlled inputs
  const [formData, setFormData] = useState({
    businessName: bookingData.requirements?.businessName || '',
    handles: bookingData.requirements?.handles || '',
    aesthetic: bookingData.requirements?.aesthetic || '',
    objectives: bookingData.requirements?.objectives || '',
    fileName: bookingData.requirements?.fileName || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fileName: e.target.files[0].name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingData((prev: any) => ({ ...prev, requirements: formData }));
    setView(AppView.USER_ORDER_SUMMARY);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-12 border border-stone-200">
      <div className="mb-10 border-b border-stone-100 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">Step 2 of 4</span>
        <h2 className="text-3xl font-serif font-bold text-stone-900 mt-2">Briefing for {service?.title}</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Business Name <span className="text-red-500">*</span></label>
            <input name="businessName" value={formData.businessName} onChange={handleChange} type="text" required className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg placeholder-stone-300" placeholder="e.g. Maison de Café" />
          </div>
          <div>
             <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Social Handles <span className="text-red-500">*</span></label>
             <input name="handles" value={formData.handles} onChange={handleChange} type="text" required className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg placeholder-stone-300" placeholder="@brandname" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Aesthetic Direction <span className="text-red-500">*</span></label>
          <input name="aesthetic" value={formData.aesthetic} onChange={handleChange} type="text" required className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg placeholder-stone-300" placeholder="e.g. Minimalist, Monochrome, High-Flash Photography" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Campaign Objectives <span className="text-red-500">*</span></label>
          <textarea name="objectives" value={formData.objectives} onChange={handleChange} required rows={4} className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg placeholder-stone-300 resize-none" placeholder="Outline your key goals for this period..."></textarea>
        </div>

        {/* File Upload Section */}
        <div 
           className={`border border-dashed p-12 text-center transition cursor-pointer group ${formData.fileName ? 'border-amber-500 bg-amber-50/50' : 'border-stone-300 hover:bg-stone-50'}`}
           onClick={() => fileInputRef.current?.click()}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,application/pdf" />
          {formData.fileName ? (
             <div className="flex flex-col items-center text-amber-700">
               <FileCheck className="h-8 w-8 mb-2" />
               <p className="text-xs font-bold uppercase tracking-widest">{formData.fileName}</p>
               <p className="text-[10px] mt-1 opacity-70">Click to change file</p>
             </div>
          ) : (
            <>
              <Upload className="mx-auto h-8 w-8 text-stone-300 group-hover:text-stone-900 transition-colors" strokeWidth={1} />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-stone-400">Upload Brand Assets (Optional)</p>
            </>
          )}
        </div>

        <div className="pt-6 flex justify-between items-center">
           <button type="button" onClick={() => setView(AppView.USER_SERVICE_SELECTION)} className="text-stone-500 hover:text-stone-900 text-xs font-bold uppercase tracking-[0.2em]">Back</button>
           <button type="submit" className="px-10 py-4 bg-stone-900 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition">
            Proceed to Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export const OrderSummary = ({ setView, bookingData, services }: { setView: (v: AppView) => void, bookingData: any, services: ServicePackage[] }) => {
  const service = services.find(s => s.id === bookingData.serviceId);
  if (!service) return null;

  return (
    <div className="max-w-2xl mx-auto">
       <div className="bg-white p-12 border border-stone-200 shadow-sm mb-8">
          <div className="flex justify-between items-start border-b border-stone-100 pb-8 mb-8">
             <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">Step 3 of 4</span>
                <h2 className="text-3xl font-serif font-bold text-stone-900 mt-2">Order Summary</h2>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Date</p>
                <p className="font-serif text-stone-900">{new Date().toLocaleDateString()}</p>
             </div>
          </div>
          
          <div className="space-y-6 mb-8">
             <div className="flex justify-between items-center">
                <span className="font-serif text-lg text-stone-700">{service.title} (1 Month)</span>
                <span className="font-serif text-lg text-stone-900">${service.price}.00</span>
             </div>
             <div className="flex justify-between items-center text-stone-500 text-sm">
                <span>Service Fee (Processing)</span>
                <span>$0.00</span>
             </div>
             <div className="flex justify-between items-center text-stone-500 text-sm">
                <span>Tax (Est.)</span>
                <span>$0.00</span>
             </div>
             {bookingData.requirements?.fileName && (
                <div className="flex justify-between items-center text-stone-500 text-sm">
                  <span>Assets Uploaded</span>
                  <span className="text-amber-600 truncate max-w-[150px]">{bookingData.requirements.fileName}</span>
                </div>
             )}
             <div className="border-t border-stone-100 pt-6 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900">Total Due</span>
                <span className="text-3xl font-serif font-bold text-stone-900">${service.price}.00</span>
             </div>
          </div>

          <div className="bg-stone-50 p-6 border border-stone-100 mb-8">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">Includes</h4>
             <ul className="grid grid-cols-2 gap-2">
               {service.features.map((f, i) => (
                 <li key={i} className="flex items-center text-xs text-stone-600"><CheckCircle size={12} className="mr-2 text-stone-900"/> {f}</li>
               ))}
             </ul>
          </div>

          <button onClick={() => setView(AppView.USER_PAYMENT)} className="w-full py-5 bg-stone-900 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition">
             Secure Checkout
          </button>
          <button onClick={() => setView(AppView.USER_REQUIREMENTS)} className="w-full mt-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900">
             Edit Requirements
          </button>
       </div>
    </div>
  );
};

export const PaymentGateway = ({ setView, bookingData, sharedState }: { setView: (v: AppView) => void, bookingData: any, sharedState: SharedStateProps }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Strict Format Handlers
  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(val);
  };

  const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9/]/g, '');
    if (val.length === 2 && !val.includes('/')) val += '/';
    setExpiry(val.slice(0, 5));
  };

  const handleCvc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvc(val);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Strict Validation Logic
    if (cardNumber.length !== 16) {
      setError("Card number must be exactly 16 digits.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Expiry must be in MM/YY format.");
      return;
    }
    if (cvc.length !== 3) {
      setError("CVC must be exactly 3 digits.");
      return;
    }
    if (!cardName.trim()) {
       setError("Cardholder name is required.");
       return;
    }

    setProcessing(true);
    
    // Simulate API processing time
    setTimeout(() => {
      // 1. Create the Order in Shared State (Live Sync)
      const service = sharedState.services.find(s => s.id === bookingData.serviceId);
      const newOrderId = `ORD-${Date.now().toString().slice(-4)}`;
      
      sharedState.addOrder({
        id: newOrderId,
        customerName: 'Marcus Thorne', // In real app, get from Auth context
        service: service?.title || 'Custom Package',
        status: 'Pending',
        date: new Date().toLocaleDateString(),
        amount: service?.price || 0,
        timeline: [{ title: 'Order Placed', date: new Date().toLocaleDateString(), completed: true }]
      });

      // 2. Add Requirement for Admin Review
      sharedState.addRequirement({
        id: `REQ-${Date.now().toString().slice(-4)}`,
        orderId: newOrderId,
        customerName: 'Marcus Thorne',
        serviceName: service?.title || 'Custom Service',
        submittedDate: new Date().toLocaleDateString(),
        status: 'Pending Review',
        details: {
          handles: bookingData.requirements?.handles || '',
          aesthetic: bookingData.requirements?.aesthetic || '',
          objectives: bookingData.requirements?.objectives || '',
          brandAssets: bookingData.requirements?.fileName
        }
      });

      setProcessing(false);
      setView(AppView.USER_CONFIRMATION);
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-12 border border-stone-200">
      <div className="mb-10 text-center">
        <div className="mx-auto h-12 w-12 bg-stone-50 rounded-full flex items-center justify-center text-stone-900 mb-4 border border-stone-100">
           <ShieldCheck size={24} strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-900">Secure Payment</h2>
        <p className="text-stone-500 font-light mt-2">Encrypted SSL Connection</p>
      </div>

      <form onSubmit={handlePay} className="space-y-8">
         <div>
            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Cardholder Name</label>
            <input 
              type="text" 
              required 
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg placeholder-stone-300" 
              placeholder="NAME ON CARD" 
            />
         </div>
         
         <div className="relative">
            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Card Number</label>
            <input 
              type="text" 
              required 
              value={cardNumber}
              onChange={handleCardNumber}
              className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg placeholder-stone-300" 
              placeholder="0000 0000 0000 0000" 
            />
            <CreditCard className="absolute right-0 bottom-4 text-stone-300" size={20} />
         </div>

         <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Expiry (MM/YY)</label>
              <input 
                type="text" 
                required 
                value={expiry}
                onChange={handleExpiry}
                className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg placeholder-stone-300" 
                placeholder="MM / YY" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">CVC</label>
              <input 
                type="text" 
                required 
                value={cvc}
                onChange={handleCvc}
                className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg placeholder-stone-300" 
                placeholder="123" 
              />
            </div>
         </div>

         {error && (
            <div className="bg-red-50 p-4 border border-red-100 flex items-center text-red-700 text-xs font-medium">
               <AlertCircle size={16} className="mr-2" />
               {error}
            </div>
         )}

         <div className="pt-6">
            <button disabled={processing} type="submit" className="w-full py-5 bg-stone-900 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition disabled:opacity-80 flex items-center justify-center">
              {processing ? <Loader2 className="animate-spin mr-2" /> : `Pay Now`}
            </button>
            <div className="text-center mt-4 flex items-center justify-center text-[10px] text-stone-400 uppercase tracking-widest">
               <ShieldCheck size={12} className="mr-2" />
               Payment processed securely by Stripe
            </div>
         </div>
      </form>
    </div>
  );
};

export const PaymentConfirmation = ({ setView }: { setView: (v: AppView) => void }) => {
  return (
    <div className="max-w-2xl mx-auto text-center py-20 animate-fade-in-up">
      <div className="mx-auto h-24 w-24 border border-stone-200 flex items-center justify-center text-emerald-600 mb-8 rounded-full bg-emerald-50">
        <CheckCircle size={40} strokeWidth={1} />
      </div>
      <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">Payment Successful</h2>
      <p className="text-stone-500 font-light mb-12 text-lg max-w-md mx-auto">
        Thank you for your trust. Your order has been confirmed. Our team has received your brief and will begin the curation process immediately.
      </p>
      <div className="flex justify-center space-x-6">
        <button onClick={() => setView(AppView.USER_DASHBOARD)} className="px-8 py-4 border border-stone-300 text-stone-900 hover:border-stone-900 text-xs font-bold uppercase tracking-[0.2em] transition-colors">
          Return to Dashboard
        </button>
        <button onClick={() => setView(AppView.USER_TRACKING)} className="px-8 py-4 bg-stone-900 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors">
          Track Order
        </button>
      </div>
    </div>
  );
};

export const OrderTracking = ({ sharedState }: { sharedState?: SharedStateProps }) => {
  // Grab the most recent order for demonstration
  const recentOrder = sharedState?.orders.find(o => o.customerName === "Marcus Thorne" || o.id.startsWith('ORD-'));

  if (!recentOrder) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
         <h2 className="text-2xl font-serif text-stone-900 mb-4">No Active Orders</h2>
         <p className="text-stone-500 font-light">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
       <div className="bg-white p-10 border border-stone-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">Order #{recentOrder.id}</h2>
            <p className="text-stone-500 text-sm mt-1">{recentOrder.service} • Placed on {recentOrder.date}</p>
          </div>
          <span className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] border 
            ${recentOrder.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
            recentOrder.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
            'bg-stone-50 text-stone-500 border-stone-100'}`}>
            {recentOrder.status}
          </span>
       </div>

       <div className="bg-white p-12 border border-stone-200">
          <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-10">Production Timeline</h3>
          <div className="space-y-12 border-l border-stone-100 ml-4 pl-12 relative">
             {recentOrder.timeline?.map((step, i) => (
               <div key={i} className="relative">
                  <div className={`absolute -left-[54px] h-3 w-3 rounded-full border-2 ${step.completed ? 'bg-stone-900 border-stone-900' : 'bg-white border-stone-200'}`}></div>
                  <h4 className={`text-lg font-serif font-bold ${step.completed ? 'text-stone-900' : 'text-stone-300'}`}>{step.title}</h4>
                  <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest">{step.date}</p>
               </div>
             ))}
             {(!recentOrder.timeline || recentOrder.timeline.length === 0) && (
                <p className="text-sm text-stone-400 italic">Timeline will update as our team processes your order.</p>
             )}
          </div>
       </div>
    </div>
  );
};

export const SubscriptionUpgrade = ({ setView }: { setView: (v: AppView) => void }) => {
  return (
    <div className="max-w-5xl mx-auto">
       <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">Upgrade to Premium</h2>
          <p className="text-lg text-stone-500 font-light max-w-2xl mx-auto">Ensure continuous growth with our recurring concierge membership.</p>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 border border-stone-200 opacity-60">
             <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Standard Access</h3>
             <p className="text-xs uppercase tracking-widest text-stone-400 mb-8">Current Tier</p>
             <ul className="space-y-4 mb-8">
                <li className="flex items-center text-sm text-stone-600"><CheckCircle size={16} className="mr-3 text-stone-300"/> 1-Month Duration</li>
                <li className="flex items-center text-sm text-stone-600"><CheckCircle size={16} className="mr-3 text-stone-300"/> Standard Support</li>
             </ul>
             <button disabled className="w-full py-4 border border-stone-200 text-stone-400 text-xs font-bold uppercase tracking-[0.2em] cursor-not-allowed">Active</button>
          </div>

          <div className="bg-stone-950 p-10 border border-stone-900 text-white relative shadow-xl transform scale-105">
             <div className="absolute top-0 right-0 p-6 text-amber-500"><Sparkles size={32} strokeWidth={1} /></div>
             <h3 className="text-2xl font-serif font-bold text-white mb-2">Premium Membership</h3>
             <p className="text-xs uppercase tracking-widest text-amber-600 mb-8">Recommended Upgrade</p>
             <ul className="space-y-4 mb-10">
                <li className="flex items-center text-sm text-stone-300"><Star size={16} className="mr-3 text-amber-600"/> Recurring Monthly Service</li>
                <li className="flex items-center text-sm text-stone-300"><Star size={16} className="mr-3 text-amber-600"/> Priority 24/7 Concierge</li>
                <li className="flex items-center text-sm text-stone-300"><Star size={16} className="mr-3 text-amber-600"/> Quarterly Strategy Audits</li>
                <li className="flex items-center text-sm text-stone-300"><Star size={16} className="mr-3 text-amber-600"/> Advanced Analytics</li>
             </ul>
             <div className="flex justify-between items-center border-t border-stone-800 pt-8 mb-8">
                <span className="text-xs uppercase tracking-widest text-stone-500">Add-on Price</span>
                <span className="text-3xl font-serif font-bold text-white">$200<span className="text-sm font-light text-stone-500">/mo</span></span>
             </div>
             <button onClick={() => setView(AppView.USER_PAYMENT)} className="w-full py-5 bg-amber-600 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-700 transition shadow-lg">Upgrade Membership</button>
          </div>
       </div>
    </div>
  );
};

export const AiTools = () => {
  const [activeTab, setActiveTab] = useState<'ideas' | 'bio'>('ideas');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  
  // Ideas State
  const [topic, setTopic] = useState('');
  const [vibe, setVibe] = useState('');

  // Bio State
  const [bizType, setBizType] = useState('');
  const [highlights, setHighlights] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');
    try {
      if (activeTab === 'ideas') {
        const res = await generateContentIdeas(topic, vibe);
        setResult(res);
      } else {
        const res = await generateBio(bizType, highlights);
        setResult(res);
      }
    } catch (e) {
      setResult("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="bg-white p-12 border border-stone-200">
        <div className="flex items-center space-x-6 mb-12">
           <div className="bg-stone-900 p-4 text-amber-500"><Sparkles size={24} strokeWidth={1} /></div>
           <div>
             <h2 className="text-3xl font-serif font-bold text-stone-900">AI Creative Studio</h2>
             <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mt-2">Powered by Gemini 1.5</p>
           </div>
        </div>

        <div className="flex border-b border-stone-100 mb-12">
          <button 
            onClick={() => { setActiveTab('ideas'); setResult(''); }}
            className={`flex-1 py-5 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === 'ideas' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Post Concepts
          </button>
          <button 
            onClick={() => { setActiveTab('bio'); setResult(''); }}
            className={`flex-1 py-5 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === 'bio' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Bio Architect
          </button>
        </div>

        <div className="space-y-10">
          {activeTab === 'ideas' ? (
            <>
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Subject Matter</label>
                <input value={topic} onChange={(e) => setTopic(e.target.value)} type="text" className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" placeholder="e.g. Summer Solstice Collection" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Tone of Voice</label>
                <input value={vibe} onChange={(e) => setVibe(e.target.value)} type="text" className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" placeholder="e.g. Sophisticated, Witty, Exclusive" />
              </div>
            </>
          ) : (
             <>
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Brand Category</label>
                <input value={bizType} onChange={(e) => setBizType(e.target.value)} type="text" className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" placeholder="e.g. Artisan Jeweler" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Key Differentiators</label>
                <input value={highlights} onChange={(e) => setHighlights(e.target.value)} type="text" className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" placeholder="e.g. Handcrafted in Italy, Sustainable Gold" />
              </div>
            </>
          )}

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex items-center justify-center py-5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-[0.2em] transition disabled:opacity-70 mt-8"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 text-amber-500" size={16} strokeWidth={1} />}
            {loading ? 'Curating...' : 'Generate Assets'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white p-12 border border-stone-200 relative animate-fade-in shadow-lg">
          <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-6">Generated Output</h3>
          <div className="whitespace-pre-line text-stone-800 leading-relaxed font-light text-lg">
            {result}
          </div>
          <button 
             onClick={() => navigator.clipboard.writeText(result)}
             className="absolute top-12 right-12 text-stone-400 hover:text-stone-900 transition" 
             title="Copy"
          >
            <Copy size={20} strokeWidth={1} />
          </button>
        </div>
      )}
    </div>
  );
};