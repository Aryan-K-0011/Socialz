import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-stone-200 shadow-2xl p-12 text-center animate-fade-in-up">
            <div className="mx-auto h-16 w-16 bg-red-50 rounded-full flex items-center justify-center text-red-900 mb-6 border border-red-100">
              <AlertCircle size={32} strokeWidth={1} />
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-4">
              Temporary Disruption
            </h1>
            
            <p className="text-stone-500 font-light mb-8 leading-relaxed">
              Our digital atelier has encountered an unexpected issue. We apologize for the interruption to your experience.
            </p>

            {this.state.error && (
              <div className="bg-stone-50 p-4 border border-stone-100 mb-8 text-left overflow-hidden">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Error Details</p>
                <code className="text-xs text-red-600 font-mono block break-words">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <div className="space-y-4">
              <button 
                onClick={this.handleReload}
                className="w-full bg-stone-900 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition-colors flex items-center justify-center"
              >
                <RefreshCw size={14} className="mr-2" /> Reload Application
              </button>
              
              <button 
                onClick={this.handleGoHome}
                className="w-full border border-stone-200 text-stone-500 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:text-stone-900 hover:border-stone-900 transition-colors flex items-center justify-center"
              >
                <Home size={14} className="mr-2" /> Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}