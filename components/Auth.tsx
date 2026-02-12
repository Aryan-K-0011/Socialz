import React from 'react';
import { AppView, UserRole } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AuthProps {
  view: AppView;
  onLogin: (role: UserRole) => void;
  setView: (view: AppView) => void;
}

export const Auth: React.FC<AuthProps> = ({ view, onLogin, setView }) => {
  const isLogin = view === AppView.LOGIN || view === AppView.ADMIN_LOGIN;
  const isAdmin = view === AppView.ADMIN_LOGIN;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
        onLogin(isAdmin ? UserRole.ADMIN : UserRole.USER);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-stone-900 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-40">
           <img 
             src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
             className="w-full h-full object-cover grayscale"
             alt="Luxury Abstract"
           />
        </div>
        <div className="relative z-10 text-center px-12">
            <div className="mx-auto h-16 w-16 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-8 rounded-full">
               <Sparkles size={32} />
            </div>
            <h1 className="text-6xl font-serif text-white mb-6">Socialz <span className="italic text-stone-400">Atelier</span></h1>
            <p className="text-stone-300 text-lg font-light max-w-md mx-auto leading-relaxed">
              Curating digital legacies for the world's most discerning brands. Enter the inner circle.
            </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-stone-50 flex items-center justify-center px-8 sm:px-12 lg:px-24">
        <div className="w-full max-w-md space-y-10">
           <div className="text-center lg:text-left">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-2 block">
               {isAdmin ? 'Staff Portal' : 'Membership'}
             </span>
             <h2 className="text-4xl font-serif font-bold text-stone-900">
               {isLogin ? 'Welcome Back' : 'Apply for Access'}
             </h2>
           </div>

           <form onSubmit={handleSubmit} className="space-y-8">
              {!isLogin && (
                <div className="relative group">
                   <input type="text" required className="w-full border-b border-stone-300 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors placeholder-transparent peer" id="name" placeholder="Name" />
                   <label htmlFor="name" className="absolute left-0 -top-3.5 text-stone-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-900 peer-focus:text-xs">Full Name</label>
                </div>
              )}
              
              <div className="relative group">
                 <input type="email" required className="w-full border-b border-stone-300 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors placeholder-transparent peer" id="email" placeholder="Email" />
                 <label htmlFor="email" className="absolute left-0 -top-3.5 text-stone-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-900 peer-focus:text-xs">Email Address</label>
              </div>

              <div className="relative group">
                 <input type="password" required className="w-full border-b border-stone-300 py-3 bg-transparent text-stone-900 focus:outline-none focus:border-stone-900 transition-colors placeholder-transparent peer" id="password" placeholder="Password" />
                 <label htmlFor="password" className="absolute left-0 -top-3.5 text-stone-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-900 peer-focus:text-xs">Password</label>
              </div>

              <button type="submit" className="w-full bg-stone-900 text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition-all duration-300 flex items-center justify-center group">
                 {isLogin ? 'Enter Dashboard' : 'Submit Application'}
                 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </button>
           </form>

           <div className="flex flex-col space-y-4 pt-6 border-t border-stone-200">
              {!isAdmin && (
                <button onClick={() => setView(isLogin ? AppView.SIGNUP : AppView.LOGIN)} className="text-stone-500 hover:text-stone-900 text-xs uppercase tracking-widest text-left">
                   {isLogin ? "No account? Apply for membership" : "Already a member? Sign In"}
                </button>
              )}
               <button onClick={() => setView(isAdmin ? AppView.LOGIN : AppView.ADMIN_LOGIN)} className="text-stone-400 hover:text-stone-600 text-[10px] uppercase tracking-widest text-left">
                   {isAdmin ? 'Back to Member Login' : 'Staff Login'}
                </button>
           </div>
        </div>
      </div>
    </div>
  );
};