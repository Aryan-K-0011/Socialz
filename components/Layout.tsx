import React, { useEffect, useState } from 'react';
import { Menu, X, Instagram, Facebook, Twitter, LogOut, LayoutDashboard, FileText, ShoppingBag, Settings, PieChart, Users, Sparkles, MessageCircle, ArrowRight, User, CreditCard, Box, ClipboardList, Repeat } from 'lucide-react';
import { AppView, UserRole } from '../types';

interface NavProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  userRole: UserRole;
  logout: () => void;
}

export const PublicHeader: React.FC<NavProps> = ({ setView, currentView, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Define which views have a dark hero section (White text is visible)
  const hasDarkHero = [AppView.HOME, AppView.ABOUT, AppView.SERVICE_DETAIL].includes(currentView);
  
  // Determine if we should use dark text (when scrolled OR on pages with light backgrounds)
  const useDarkText = scrolled || !hasDarkHero;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ view, label }: { view: AppView; label: string }) => (
    <button
      onClick={() => {
        setView(view);
        setIsOpen(false);
      }}
      className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 relative group px-2 ${
        useDarkText 
          ? 'text-stone-900 hover:text-amber-600' 
          : 'text-stone-800 md:text-white md:hover:text-amber-400'
      }`}
    >
      {label}
      <span className={`absolute -bottom-2 left-0 w-0 h-px transition-all duration-500 group-hover:w-full ${useDarkText ? 'bg-amber-600' : 'bg-amber-400'}`}></span>
    </button>
  );

  return (
    <>
    <nav className={`fixed w-full top-0 z-50 transition-all duration-700 ease-in-out border-b ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-xl border-stone-200 py-4 shadow-sm' 
        : 'bg-transparent border-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => setView(AppView.HOME)}>
            <div className={`mr-3 transition-transform group-hover:rotate-12 duration-700 ${useDarkText ? 'text-stone-900' : 'text-white'}`}>
               <Sparkles size={22} strokeWidth={1} />
            </div>
            <span className={`font-serif font-bold text-2xl tracking-widest ${useDarkText ? 'text-stone-900' : 'text-white'}`}>
              SOCIALZ
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink view={AppView.HOME} label="Home" />
            <NavLink view={AppView.SERVICES} label="Services" />
            <NavLink view={AppView.PRICING} label="Pricing" />
            <NavLink view={AppView.ABOUT} label="About" />
            <NavLink view={AppView.FAQ} label="FAQ" />
            <NavLink view={AppView.CONTACT} label="Contact" />
            
            <div className={`w-px h-4 mx-4 ${useDarkText ? 'bg-stone-300' : 'bg-stone-500/30'}`}></div>

            {userRole === UserRole.GUEST ? (
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setView(AppView.LOGIN)}
                  className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${useDarkText ? 'text-stone-900 hover:text-amber-600' : 'text-white hover:text-amber-400'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setView(AppView.SIGNUP)}
                  className={`border px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-amber-600 hover:border-amber-600 hover:text-white ${
                    useDarkText 
                      ? 'border-stone-900 text-stone-900' 
                      : 'border-white text-white'
                  }`}
                >
                  Join
                </button>
              </div>
            ) : (
              <button
                 onClick={() => setView(userRole === UserRole.ADMIN ? AppView.ADMIN_DASHBOARD : AppView.USER_DASHBOARD)}
                 className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] border px-5 py-2 transition-all duration-300 hover:bg-stone-900 hover:text-white ${
                   useDarkText ? 'border-stone-900 text-stone-900' : 'border-white text-white hover:border-stone-900'
                 }`}
              >
                <span>Dashboard</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={`${useDarkText ? 'text-stone-900' : 'text-white'} hover:text-amber-500 transition-colors`}>
              {isOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-stone-950 z-40 transition-transform duration-700 ease-[0.22,1,0.36,1] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <div className="flex flex-col h-full justify-center px-12 space-y-8">
            {[
              {v: AppView.HOME, l: "Home"},
              {v: AppView.SERVICES, l: "Services"},
              {v: AppView.PRICING, l: "Pricing"},
              {v: AppView.ABOUT, l: "About"},
              {v: AppView.CONTACT, l: "Contact"}
            ].map((item, idx) => (
              <button 
                key={idx}
                onClick={() => { setView(item.v); setIsOpen(false); }}
                className="text-4xl font-serif font-bold text-white text-left hover:text-amber-500 transition-colors duration-300"
              >
                {item.l}
              </button>
            ))}
            
            <div className="border-t border-stone-800 pt-8 mt-8 flex flex-col space-y-4">
               {userRole === UserRole.GUEST ? (
                 <>
                  <button onClick={() => { setView(AppView.LOGIN); setIsOpen(false); }} className="text-sm font-bold uppercase tracking-widest text-stone-400 hover:text-white text-left">Login</button>
                  <button onClick={() => { setView(AppView.SIGNUP); setIsOpen(false); }} className="text-sm font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400 text-left">Become a Member</button>
                 </>
               ) : (
                 <button onClick={() => { setView(userRole === UserRole.ADMIN ? AppView.ADMIN_DASHBOARD : AppView.USER_DASHBOARD); setIsOpen(false); }} className="text-sm font-bold uppercase tracking-widest text-white text-left">Return to Dashboard</button>
               )}
            </div>
         </div>
         {/* Close button inside overlay */}
         <button onClick={() => setIsOpen(false)} className="absolute top-8 right-6 text-white hover:text-amber-500 transition-colors">
            <X size={28} strokeWidth={1} />
         </button>
      </div>
    </nav>
    
    {/* Floating Concierge Button - More Minimal */}
    <button 
      className="fixed bottom-10 right-10 z-50 bg-stone-900 text-white p-5 rounded-full shadow-2xl hover:bg-amber-600 transition-all duration-500 group border border-stone-800 hover:scale-110"
      onClick={() => setView(AppView.CONTACT)}
    >
      <MessageCircle size={24} strokeWidth={1.5} />
      <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap shadow-xl translate-x-4 group-hover:translate-x-0">
        Concierge
      </span>
    </button>
    </>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-stone-950 text-stone-400 py-24 border-t border-stone-900">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center mb-8">
             <div className="mr-3 text-amber-600">
               <Sparkles size={24} strokeWidth={1} />
            </div>
            <span className="font-serif font-bold text-3xl text-white tracking-widest">SOCIALZ</span>
          </div>
          <p className="text-stone-500 text-sm leading-loose max-w-sm font-light mb-8">
            We are a digital atelier crafting bespoke social narratives for the world's most discerning brands. Where data meets desire.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-stone-500 hover:text-white transition-colors transform hover:-translate-y-1 duration-300"><Instagram size={20} strokeWidth={1.5} /></a>
            <a href="#" className="text-stone-500 hover:text-white transition-colors transform hover:-translate-y-1 duration-300"><Facebook size={20} strokeWidth={1.5} /></a>
            <a href="#" className="text-stone-500 hover:text-white transition-colors transform hover:-translate-y-1 duration-300"><Twitter size={20} strokeWidth={1.5} /></a>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-8">Services</h3>
          <ul className="space-y-4 text-xs font-medium tracking-wide">
            <li className="hover:text-amber-500 cursor-pointer transition-colors uppercase">Startups</li>
            <li className="hover:text-amber-500 cursor-pointer transition-colors uppercase">Hospitality</li>
            <li className="hover:text-amber-500 cursor-pointer transition-colors uppercase">Personal Brand</li>
            <li className="hover:text-amber-500 cursor-pointer transition-colors uppercase">Weddings</li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-8">Company</h3>
          <ul className="space-y-4 text-xs font-medium tracking-wide">
            <li className="hover:text-amber-500 cursor-pointer transition-colors uppercase">Manifesto</li>
            <li className="hover:text-amber-500 cursor-pointer transition-colors uppercase">Atelier</li>
            <li className="hover:text-amber-500 cursor-pointer transition-colors uppercase">Journal</li>
            <li className="hover:text-amber-500 cursor-pointer transition-colors uppercase">Contact</li>
          </ul>
        </div>

        <div className="md:col-span-3">
           <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-8">Newsletter</h3>
           <form className="relative border-b border-stone-800 pb-2">
             <input type="email" placeholder="ENTER EMAIL" className="bg-transparent w-full text-xs tracking-widest text-white placeholder-stone-600 focus:outline-none uppercase" />
             <button className="absolute right-0 bottom-2 text-stone-500 hover:text-amber-500 transition-colors">
               <ArrowRight size={16} />
             </button>
           </form>
        </div>
      </div>
      <div className="border-t border-stone-900 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">
        <p>&copy; {new Date().getFullYear()} Socialz Inc.</p>
        <div className="space-x-8 mt-4 md:mt-0">
          <span className="cursor-pointer hover:text-stone-400">Privacy</span>
          <span className="cursor-pointer hover:text-stone-400">Terms</span>
        </div>
      </div>
    </div>
  </footer>
);

export const DashboardLayout: React.FC<{ children: React.ReactNode; title: string; view: AppView; setView: (v: AppView) => void; role: UserRole; logout: () => void }> = ({ children, title, view, setView, role, logout }) => {
  const isUser = role === UserRole.USER;
  
  const SidebarItem = ({ target, icon: Icon, label }: { target: AppView; icon: any; label: string }) => (
    <button
      onClick={() => setView(target)}
      className={`w-full flex items-center space-x-4 px-8 py-5 transition-all duration-300 border-l-2 ${
        view === target ? 'bg-stone-50 border-amber-600 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-900 hover:bg-stone-50'
      }`}
    >
      <Icon size={18} strokeWidth={1.5} className={view === target ? 'text-amber-600' : ''} />
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-stone-200 hidden md:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="p-10 border-b border-stone-100 flex items-center justify-center">
           <div className="mr-3 text-stone-900">
             <Sparkles size={20} strokeWidth={1} />
           </div>
          <span className="font-serif font-bold text-2xl text-stone-900 tracking-[0.1em]">SOCIALZ</span>
        </div>
        
        <div className="flex-1 py-8 overflow-y-auto">
          {isUser ? (
            <>
              <div className="px-8 mb-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Concierge</div>
              <SidebarItem target={AppView.USER_DASHBOARD} icon={LayoutDashboard} label="Overview" />
              <SidebarItem target={AppView.USER_SERVICE_SELECTION} icon={ShoppingBag} label="Book Service" />
              <SidebarItem target={AppView.USER_TRACKING} icon={PieChart} label="Tracking" />
              <SidebarItem target={AppView.USER_PROFILE} icon={User} label="Profile" />
              
              <div className="px-8 mb-6 mt-10 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Atelier</div>
              <SidebarItem target={AppView.USER_AI_TOOLS} icon={Sparkles} label="AI Studio" />
              <SidebarItem target={AppView.USER_SUBSCRIPTION} icon={Sparkles} label="Membership" />
              <div className="pt-12 px-8">
                 <button onClick={() => setView(AppView.HOME)} className="w-full flex items-center space-x-3 text-stone-400 hover:text-stone-900 transition text-xs font-bold uppercase tracking-widest">
                    <LogOut size={16} className="rotate-180" />
                    <span>Exit Portal</span>
                 </button>
              </div>
            </>
          ) : (
            <>
              <div className="px-8 mb-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Management</div>
              <SidebarItem target={AppView.ADMIN_DASHBOARD} icon={LayoutDashboard} label="Overview" />
              <SidebarItem target={AppView.ADMIN_CUSTOMERS} icon={Users} label="Clientele" />
              <SidebarItem target={AppView.ADMIN_ORDERS} icon={ShoppingBag} label="Orders" />
              <SidebarItem target={AppView.ADMIN_REQUIREMENTS} icon={ClipboardList} label="Requests" />
              <SidebarItem target={AppView.ADMIN_SUBSCRIPTIONS} icon={Repeat} label="Subscriptions" />
              <SidebarItem target={AppView.ADMIN_PAYMENTS} icon={CreditCard} label="Payments" />
              <SidebarItem target={AppView.ADMIN_SERVICES} icon={Box} label="Packages" />
            </>
          )}
        </div>

        <div className="p-8 border-t border-stone-100">
          <button onClick={logout} className="w-full flex items-center justify-center space-x-3 px-4 py-4 text-stone-500 hover:bg-stone-50 hover:text-red-700 transition duration-300 border border-stone-200">
            <LogOut size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen bg-[#fafaf9]">
        <header className="bg-white/50 backdrop-blur-md border-b border-stone-200 h-24 flex items-center justify-between px-10 sticky top-0 z-40">
          <h1 className="text-3xl font-serif font-bold text-stone-900">{title}</h1>
          <div className="flex items-center space-x-6">
             <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
               {role === UserRole.ADMIN ? 'Administrator' : 'Premium Member'}
             </span>
             <div className="h-10 w-10 bg-stone-900 text-white flex items-center justify-center font-serif font-italic text-lg">
               {role === UserRole.ADMIN ? 'A' : 'M'}
             </div>
          </div>
        </header>
        <div className="p-10 md:p-14 max-w-7xl mx-auto animate-fade-in-up">
          {children}
        </div>
      </main>
    </div>
  );
};